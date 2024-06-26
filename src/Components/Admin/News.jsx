import { Alert, Button, Dropdown, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { HiInformationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { TbReplace } from "react-icons/tb";
import { VscInsert } from "react-icons/vsc";

export default function News() {
  const [Data, setData] = useState([]);
  const [openViewDocs, setopenViewDocs] = useState([false, { name: "", logo: "", founder: "", link: "", head: "", description: "", content: "", cid: "", approved: null, position: 0 }])
  const [openPopup, setopenPopup] = useState(false)
  const [Warning, setWarning] = useState([false, ""])
  const [Success, setSuccess] = useState([false, ""])
  const [opt, setopt] = useState(0)

  const load = async () => {
    const send = await fetch("https://cuvette-server.vercel.app/admin/news_approval", {
      method: "GET",
      mode: "cors",
    });
    const { msg } = await send.json();
    setData(msg);
  };

  const accept = async (d) => {
    const send = await fetch("https://cuvette-server.vercel.app/admin/approve_news", {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cid: d.cid, position: opt })
    });
    const res = await send.json();
    if (res.approved == false) {
      if (res.change == true) {
        setopenPopup(true)
      } else {
        setWarning([true, res.msg])
        setSuccess([false, ""])
      }
    } else {
      setopenViewDocs([false, openViewDocs[1]]);
      setSuccess([true, res.msg])
      setWarning([false, ""])
      load()
    }
  };

  const decline = async (cid, removed) => {
    const send = await fetch("https://cuvette-server.vercel.app/admin/decline_news", {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cid, removed })
    });
    const res = await send.json();
    if (res.denied) {
      setSuccess([true, res.msg])
      setWarning([false, ""])
      load()
    } else {
      setWarning([true, res.msg])
      setSuccess([false, ""])
    }
  };

  const change = async (option, proceed) => {
    try {
      const req = await fetch('https://cuvette-server.vercel.app/admin/change_news', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors",
        body: JSON.stringify({ cid: openViewDocs[1].cid, position: opt, option, proceed })

      })
      const res = await req.json()
      if (res.msg === "already found") {
        setopenPopup(true)
      } else {
        setopenPopup(false)
        setopenViewDocs([false, openViewDocs[1]])
        if (res.updated) {
          setSuccess([true, res.msg])
          setWarning([false, ""])
          load()

        } else {
          setWarning([true, res.msg])
          setSuccess([false, ""])
        }
      }
    } catch (error) {
      setWarning([true, "Something went wrong try again!"])
      setSuccess([false, ""])
    }
  }

  useEffect(() => {
    document.title = " Approve News | Admin"
    load();
  }, []);

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5" style={{ paddingTop: 20 }}>
        <div className="pt-12 pb-4 flex w-full justify-center">
          {Warning[0] ? <Alert color="failure" icon={HiInformationCircle} className="mx-4">
            <span>
              <p>
                <span className="font-medium">{Warning[1]}</span>
              </p>
            </span>
          </Alert> : ""}
          {Success[0] ? <Alert color="success" icon={CiCircleCheck} className="mx-4 w-64">
            <span>
              <p>
                <span className="font-medium">{Success[1]}</span>
              </p>
            </span>
          </Alert> : ""}
        </div>
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <h5 className="text-2xl font-bold text-center mb-10">Company Requested for News</h5>
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden border">

            <Modal className="py-12" show={openViewDocs[0]} onClose={() => setopenViewDocs([false, openViewDocs])}>
              <Modal.Header>
                <div>
                  <h2 className="text-3xl">
                    {openViewDocs[1].name}
                  </h2>
                </div>
              </Modal.Header>
              <Modal.Body>
                <div>
                  {
                    openViewDocs[0] ?
                      <div>
                        <h5 className="text-sm text-gray-500 font-bold mt-3">Content to be shown</h5>
                        <h5 className="text-sm text-gray-800 font-bold">{new Date(openViewDocs[1].date).toISOString().split("T")[0]}</h5>
                        <h5 className="text-2xl font-bold text-gray-800 text-justify">
                          {openViewDocs[1].head}
                        </h5>
                        <h5 className="text-base text-gray-800 text-justify mt-2">
                          {openViewDocs[1].description}
                        </h5>
                        <h5 className="text-sm text-gray-500 font-bold mt-3">Proposal</h5>
                        <p className="text-base text-gray-800 text-justify">
                          {openViewDocs[1].content}
                        </p>

                      </div> : ""
                  }
                </div>
              </Modal.Body>
              <Modal.Footer>
                {
                  openViewDocs[1].approved == true ?
                    <div className="flex">
                      <select name="Position" className="rounded-md bg-black text-white mr-2" onChange={e => {
                        setopt(e.target.value);
                        setopenViewDocs([true, { ...openViewDocs[1], position: e.target.value }]);
                        change(0, false,)
                      }} value={openViewDocs[1].position}>
                        <option className="text-white" value="0">Out</option>
                        <option className="text-white" value="1">1</option>
                        <option className="text-white" value="2">2</option>
                        <option className="text-white" value="3">3</option>
                        <option className="text-white" value="4">4</option>
                        <option className="text-white" value="5">5</option>
                      </select>
                      <Button color="red" onClick={() => { setopenViewDocs([false, openViewDocs[1]]); decline(openViewDocs[1].cid, true) }}>
                        Remove
                      </Button>
                      <Modal show={openPopup} className="py-36" onClose={() => setopenPopup(false)}>
                        <Modal.Header>Choose your option</Modal.Header>
                        <Modal.Body>
                          <h5 className="mx-1 mb-5">A News is present already over there so you can choose any one of these option</h5>
                          <div className="flex">
                            <Alert color="warning" icon={HiInformationCircle} className="mx-1 w-full">
                              To insert the News in between the position use replace option if any old carosel at that position it will move one step back.
                            </Alert>
                            <Alert color="warning" icon={HiInformationCircle} className="mx-1 w-full">
                              To replace with old News use replace option and position of old News will be out.
                            </Alert>
                          </div>
                          <div className="mt-4 mx-1 flex">
                            <button onClick={e => { change(1, true) }} className="text-white bg-black rounded px-3 py-1 mx-1 cursor-pointer flex justify-center items-center text-sm"><VscInsert className="mr-2" color="white" style={{ height: 20, width: 20 }} /> Insert</button>
                            <button onClick={e => { change(0, true) }} className="text-white bg-black rounded px-3 py-1 mx-1 cursor-pointer flex justify-center items-center text-sm"><TbReplace className="mr-2" color="white" style={{ height: 20, width: 20 }} /> Replace</button>
                          </div>

                        </Modal.Body>
                      </Modal>
                    </div>
                    :
                    <div className="flex">
                      <Button className="bg-black mr-2" onClick={() => { accept(openViewDocs[1]) }}>Approve</Button>
                      <select name="Position" className="rounded-md bg-black text-white mr-2" onChange={e => setopt(e.target.value)} value={opt}>
                        <option className="text-white" value="0">Out</option>
                        <option className="text-white" value="1">1</option>
                        <option className="text-white" value="2">2</option>
                        <option className="text-white" value="3">3</option>
                        <option className="text-white" value="4">4</option>
                        <option className="text-white" value="5">5</option>
                      </select>
                      <Button color="red" onClick={() => { setopenViewDocs([false, openViewDocs[1]]); decline(openViewDocs[1].cid, false) }}>
                        Decline
                      </Button>
                      <Modal show={openPopup} className="py-36" onClose={() => setopenPopup(false)}>
                        <Modal.Header>Choose your option</Modal.Header>
                        <Modal.Body>
                          <h5 className="mx-1 mb-5">A News is present already over there so you can choose any one of these option</h5>
                          <div className="flex">
                            <Alert color="warning" icon={HiInformationCircle} className="mx-1 w-full">
                              To insert the News in between the position use replace option if any old carosel at that position it will move one step back.
                            </Alert>
                            <Alert color="warning" icon={HiInformationCircle} className="mx-1 w-full">
                              To replace with old News use replace option and position of old News will be out.
                            </Alert>
                          </div>
                          <div className="mt-4 mx-1 flex">
                            <button onClick={e => { change(1, true) }} className="text-white bg-black rounded px-3 py-1 mx-1 cursor-pointer flex justify-center items-center text-sm"><VscInsert className="mr-2" color="white" style={{ height: 20, width: 20 }} /> Insert</button>
                            <button onClick={e => { change(0, true) }} className="text-white bg-black rounded px-3 py-1 mx-1 cursor-pointer flex justify-center items-center text-sm"><TbReplace className="mr-2" color="white" style={{ height: 20, width: 20 }} /> Replace</button>
                          </div>

                        </Modal.Body>
                      </Modal>
                    </div>
                }

              </Modal.Footer>
            </Modal>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                      Company ID
                    </th>
                    <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                      Company Name
                    </th>
                    <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                      Status & Position
                    </th>

                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    Data.length > 0 ? Data.map((e, i) => {

                      return (
                        <tr key={i} className="cursor-pointer" onClick={ele => { setopenViewDocs([true, e]) }}>
                          <td className="px-6 text-center border py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                            {e.cid}
                          </td>
                          <td className="px-6 text-center border py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                            {e.name}
                          </td>
                          <td className="px-6 text-center border py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                            {e.date.split("T")[0]}
                          </td>
                          <td className="px-6 text-center py-4 border text-sm leading-5 text-indigo-600">
                            <h5>{e.approved ? `Approved | ${e.position == 0 ? "Removed" : e.position}` : "Not Approved"}  </h5>
                          </td>
                        </tr>
                      )

                    })

                      : <tr></tr>}

                </tbody>
              </table>
              {Data.length === 0 ? <h5 className="w-full text-center p-10 text-gray-600 ">No records found</h5> : null}
            </div>
          </div>
        </div>
      </section>
    </>

  );
}

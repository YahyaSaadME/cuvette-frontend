import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Modal } from 'flowbite-react'
export default function Members() {
  const [_id, set_id] = useState("")
  const [Data, setData] = useState([])
  const navigate = useNavigate()
  const [cookie, setCookie] = useCookies(["company"]);
  const [Notifi, setNotifi] = useState({ msg: "", open: false, color: "success" })
  const [openModal, setOpenModal] = useState([false, {}]);
  
  const all = async () => {
    const send = await fetch("https://cuvette-server.vercel.app/company/members/all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        _id: _id
      }),
    });
    const { data } = await send.json()
    if (data) {
      setData(data)
    }
  }

  const check = async () => {
    const getUser = await fetch("https://cuvette-server.vercel.app/company/protected", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ token: cookie.company }),
    });
    const data = await getUser.json();
    if (data.msg == "Access granted") {
      set_id(data.id)
    } else {
      navigate('/mycompany/login')
    }
  };

  const add = async (userId) => {
    const send = await fetch("https://cuvette-server.vercel.app/company/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        userId, _id: _id
      }),
    });
    const res = await send.json()
    setNotifi({ color: !!res.updated ? "success" : "warning", open: true, msg: res.msg })
    all()
  }
  const find_member = async (userId) => {
    console.log(userId);
    const getUser = await fetch("https://cuvette-server.vercel.app/company/member/find", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ _id: userId }),
    });
    const { data } = await getUser.json();
    console.log(data);
    setOpenModal([true, data])
  }

  useEffect(() => {
    check()
    all()
  }, [_id])


  return (
    <div className='py-24 mx-4'>
      <div className='fixed w-full flex justify-center'>
        <Alert style={{ display: Notifi.open ? null : "none" }} className='w-1/2' color={Notifi.color}>
          <h2>{Notifi.msg}</h2>
        </Alert>
      </div>
      <div className="w-full">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                S.no
              </th><th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                User ID
              </th>
              <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                <select name="" id="" style={{ border: "none" }}>
                  <option value="all">Status</option>
                  <option value="applied">Applied Only</option>
                  <option value="removed">Removed Only</option>
                  <option value="Working">Working Only</option>
                </select>
              </th>              <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                ROll
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">

            {
              Data ? Data.map((e, i) => {
                return (
                  <tr onClick={ele => { setOpenModal([true, e]); find_member(e.userId) }} key={i} className="cursor-pointer">
                    <td className="px-6 text-center border py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                      {i + 1}
                    </td><td className="px-6 text-center border py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                      {e.userId}
                    </td>
                    <td className={`px-6 text-center py-4 border whitespace-no-wrap text-sm leading-5`} style={{ color: e.status == 1 ? "green" : e.status == 2 ? "orange" : "red" }}>
                      {e.status == 1 ? "Joined" : e.status == 2 ? "Applied" : "Removed"}
                    </td>
                    <td className="px-6 text-center py-4 border whitespace-no-wrap text-sm leading-5 text-indigo-600 hover:text-indigo-900">
                      {e.roll}
                    </td>
                  </tr>
                )

              })

                : <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>}
          </tbody>
        </table>
      </div>
      <Modal show={openModal[0]} onClose={() => setOpenModal([false, {}])} className='h-full pt-20'>
        <Modal.Header>{openModal[1].name} <br></br>
          <span className='text-sm'>{openModal[1].email}</span>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {
              openModal[0] && openModal[1].appliedCompanies ?
                openModal[1].appliedCompanies.map((e, i) => {
                  if (e.company_id == _id) {
                    const AD = new Date(e.appliedOn)
                    console.log(e.proposal);
                    return (
                      <div>
                        Applied for "<span style={{textDecoration:"underline"}}>{e.roll}</span>"  on {AD.getDate()} - {AD.getMonth()} -  {AD.getFullYear()}
                        <br></br>Proposal
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          {e.proposal} 
                        </p>
                      </div>
                    )
                  }
                }) : null
            }

            <Button color='gray' style={{}}>View resume</Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal([false, {}])}>Accept for interview</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

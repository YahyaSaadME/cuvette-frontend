import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { FaShareAlt } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Modal, Alert } from 'flowbite-react';
import { UserContext } from '../../Context/UserContext';

export default function JobView() {
  const location = useLocation();
  const [Data, setData] = useState(null)
  const [openApplyModal, setopenApplyModal] = useState(false)
  const [alert, setalert] = useState([false, "", ""])
  const [proposal, setProposal] = useState("")
  const { Name, User, setCookie, cookie } = useContext(UserContext)


  const find = async (q) => {
    const getData = await fetch(`http://localhost:5000/user/job${q}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    const { data, cdata } = await getData.json()
    const date = new Date(data.date)
    setData({ ...data, ...cdata, date })
    console.log(Data);
  }

  const apply = async () => {
    try {
      const getData = await fetch(`http://localhost:5000/user/job/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({ _id: User._id, jobs_post_id: Data._id, proposal, company_name: Data.name })
      });
      const data = await getData.json()
      if (data.updated) {
        setalert([true, 'green', data.msg])
      } else {
        setalert([true, 'red', 'Something went wrong!'])
      }
    } catch (error) {
      setalert([true, 'red', 'Something went wrong!'])
    }
  }

  useEffect(() => {
    find(location.search);
  }, [!User._id])

  return (
    Data ?
      <div className='pt-24 h-full mx-3'>
        <Modal dismissible show={openApplyModal} onClose={e => setopenApplyModal(false)}>
          <Modal.Header>Application for " {Data.title} "</Modal.Header>
          <Modal.Body>
            <div>
              {alert[0]?
              <Alert show={alert[0]} color={alert[1]}>
                {alert[2]} & {alert[1] == "green" ?<Link to={"/profile/proposals"} className='underline cursor-pointer'>view proposals.</Link> :null}
              </Alert>:null
              }
              <h5 className='text-lg font-bold'>Enter Your Proposal</h5>
              <textarea rows={10} type="text" name="proposal" className='shadow-md rounded w-full' onChange={e => setProposal(e.target.value)} value={proposal} ></textarea>
              <div className='flex'>
                <Link to={"/profile/resume"} className='shadow-md rounded-md px-3 py-1 mr-2 border cursor-pointer'>Update Resume</Link>
                <Link to={"/profile/education"} className='shadow-md rounded-md px-3 py-1 mr-2 border cursor-pointer'>Update Educational Details</Link>
              </div>
              <button className='mt-4 shadow-md rounded-md px-3 py-1 mr-2 border cursor-pointer text-white bg-black' onClick={e => apply()}>Apply</button>
            </div>
          </Modal.Body>
        </Modal>
        <div className='grid grid-cols-1 lg:grid-cols-2'>
          <div className='px-4 w-full h-3/4  mb-12 py-4 flex justify-between shadow-md rounded-md border' >
            <div >
              <h1 className='text-2xl font-bold'>{Data.title}</h1>
              <h1 className='text-md'>{Data.name}</h1>
              <h1 className='text-md'>{Data.address}</h1>
              <h1 className='text-sm text-gray-600'>Posted on {Data.date.getDate()} | {Data.date.getMonth()} | {Data.date.getFullYear()}</h1>
              <div className='flex'>
                <h1 className='text-sm text-gray-600'><a href={`https://${Data.linkedIn}`} className='text-blue-600 underline flex items-center cursor-pointer'><FaLinkedin className='mr-2 text-lg' />{Data.linkedIn}</a></h1>
                <h1 className='text-sm text-gray-600 ml-4'><a href={`https://${Data.website}`} className='text-blue-600 underline flex items-center cursor-pointer'><FaExternalLinkAlt className='mr-2 text-md' />{Data.website}</a></h1>
              </div>
            </div>
            <div className='flex items-center mt-2 justify-between' style={{ flexDirection: "column" }}>
              <FaShareAlt className='cursor-pointer' />
              <button className='p-2 bg-black text-white text-sm rounded-md mt-4' onClick={e=>setopenApplyModal(true)}>Apply Now</button>
            </div>
          </div>
          <div className='px-2 pb-6  w-full mt-2 h-3/4 lg:ml-2 mb-6 lg:mt-0 py-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 shadow-md rounded-md border' >

            <div className='mx-2 mt-2'>
              <h5 className='text-sm text-gray-500'>Job Offer</h5>
              <h5 className='text-md text-gray-800'>₹ {Data.offerPriceStart} - ₹ {Data.offerPriceEnd} LPA</h5>
            </div>
            <div className='mx-2 mt-2'>
              <h5 className='text-sm text-gray-500'>Experience</h5>
              <h5 className='text-md text-gray-800'>{Data.experinceStart} - {Data.experinceEnd} Years</h5>
            </div>
            <div className='mx-2 mt-2'>
              <h5 className='text-sm text-gray-500'>Duration</h5>
              <h5 className='text-md text-gray-800'>{Data.duration} Months</h5>
            </div>
            <div className='mx-2 mt-2'>
              <h5 className='text-sm text-gray-500'>Work Type</h5>
              <h5 className='text-md text-gray-800'>{Data.workType == 1 ? "Remote" : Data.workType == 2 ? "Hybrid" : "On site"}</h5>
            </div>
            <div className='mx-2 mt-2'>
              <h5 className='text-sm text-gray-500'>Job Type</h5>
              <h5 className='text-md text-gray-800'>{Data.jobType == 1 ? "Internship" : "Full Time"}</h5>
            </div>

          </div>
        </div>
        <div className='w-full mb-6 flex flex-col lg:flex-row' >
          <div className='shadow-md rounded-md border mt-4 px-4 py-4 lg:mr-2 lg:w-5/6'>
            <h5 className='text-md font-bold'>About Job</h5>
            <p className='text-sm mb-4 text-gray-500 border-none w-full' dangerouslySetInnerHTML={{ __html: Data.requirements.replace(/\n/g, '<br/>') }}></p>
            <hr />
            <h5 className='text-md font-bold mt-4'>About Company</h5>
            <p className='text-sm mb-4 text-gray-500 border-none w-full' dangerouslySetInnerHTML={{ __html: Data.about.replace(/\n/g, '<br/>') }}></p>
          </div>
          <div className='mt-4 grid md:grid-cols-2 lg:grid-cols-1'>

            <div className='mb-3 shadow-md rounded-md border px-4 py-4 mx-2'>
              <h5 className=' px-2 mb-2 text-md font-bold'>Skills - Required</h5>
              <div className='grid grid-cols-3'>
                {
                  Data.skills.map((e, i) => {
                    return <h5 key={i} className='text-sm border cursor-pointer mx-1 px-3 rounded-md py-1 shadow-md'>{e}</h5>
                  })
                }
              </div>
            </div>
            {
              Data.ExtraBenifits !== "" || Data.ExtraBenifits !== null ?
                <>
                  <div className='mb-3 shadow-md rounded-md border px-4 py-4 mx-2 '>
                    <h5 className=' px-2 mb-2 text-md font-bold'>Extra - Benifits</h5>
                    <h5 className='text-sm mb-4 text-gray-500'>{Data.ExtraBenifits}</h5>
                  </div>
                </> : null
            }
            {
              Data.tags.length !== 0 ?
                <>
                  <div className='mb-3 shadow-md rounded-md border px-4 py-4 mx-2'>
                    <h5 className=' px-2 mb-2 text-md font-bold'>Tags</h5>
                    <div className='grid grid-cols-1'>
                      {
                        Data.tags.map((e, i) => {
                          return <h5 key={i} className='text-sm border cursor-pointer mx-1 px-3 rounded-md py-1 shadow-md'>#{e}</h5>
                        })
                      }
                    </div>
                  </div>
                </> : null
            }


          </div>
        </div>

      </div> : null
  )
}

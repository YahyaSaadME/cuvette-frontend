import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/UserContext'
import { Label, Alert } from 'flowbite-react'

export default function Profile() {
  const { User,check } = useContext(UserContext)
  const [EditorMode, setEditorMode] = useState(false)
  const [experience, setexperience] = useState(0);
  const [github, setGithub] = useState("")
  const [website, setWebsite] = useState("")
  const [linkedin, setlinkedin] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [status, setstatus] = useState("")
  const [JoinDate, setJoinDate] = useState("")
  const [company, setcompany] = useState("")
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [alert, setalert] = useState([false])

  const update = async () => {
    try {
      const getData = await fetch(`https://cuvette-server.vercel.app/user/profile/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({ _id: User._id, experience, email, name, jobTitle, company, linkedin, github, website, status:Number(status), JoinDate:new Date(JoinDate) })
      });
      const data = await getData.json()
      if (data.updated) {
        setalert([true, 'green', data.msg])
        setEditorMode(false)
      } else {
        setalert([true, 'red', 'Something went wrong!'])
      }
      check()
    } catch (error) {
      console.log(error);
      setalert([true, 'red', 'Something went wrong!'])
    }
  }

  useEffect(() => {
    setexperience(User.experience)
    setGithub(User.socials ? User.socials.github : "")
    setWebsite(User.socials ? User.socials.website : "")
    setlinkedin(User.socials ? User.socials.linkedin : "")
    setJobTitle(User.jobTitle)
    setstatus(User.WorkingCompany ? User.WorkingCompany.status : "")
    setcompany(User.WorkingCompany ? User.WorkingCompany.company : "")
    setJoinDate(User.WorkingCompany ? User.WorkingCompany.JoinDate : "")
    setname(User.name)
    setemail(User.email)
  }, [User])


  return (
    <div className='pt-24 mb-10 px-10'>
      {alert[0] ?
        <Alert show={`${alert[0]}`} color={alert[1]} className='mx-4 mb-2'>
          {alert[2]}
        </Alert> : null
      }
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-2'>

        <div className='flex flex-col w-full px-1 mt-4' >
          <Label value='Your Name' />
          <input disabled={!EditorMode} onChange={e => setname(e.target.value)} value={name} type="text" className='rounded-md shadow' />
        </div>
        <div className='flex flex-col w-full px-1  mt-4'>
          <Label value='Your Email' />
          <input disabled={!EditorMode} onChange={e => setemail(e.target.value)} value={email} type="text" className='rounded-md shadow' />
        </div>
        <div className='flex flex-col w-full px-1  mt-4'>
          <Label value='Your Experience' />
          <input onChange={e => setexperience(e.target.value)} value={experience} type="number" className='rounded-md shadow' />
        </div>
        <div className='flex flex-col w-full px-1  mt-4'>
          <Label value='Your Linked In' />
          <input disabled={!EditorMode} onChange={e => setlinkedin(e.target.value)} value={linkedin} type="text" className='rounded-md shadow' />
        </div>
        <div className='flex flex-col w-full px-1  mt-4'>
          <Label value='Your Website' />
          <input disabled={!EditorMode} onChange={e => setWebsite(e.target.value)} value={website} type="text" className='rounded-md shadow' />
        </div>
        <div className='flex flex-col w-full px-1  mt-4'>
          <Label value='Your Github' />
          <input disabled={!EditorMode} onChange={e => setGithub(e.target.value)} value={github} type="text" className='rounded-md shadow' />
        </div>
        <div className='flex flex-col w-full px-1  mt-4'>
          <Label value='Your Job Role' />
          <input disabled={!EditorMode} onChange={e => setJobTitle(e.target.value)} value={jobTitle} type="text" className='rounded-md shadow' />
        </div>
      </div>
      <h2 className='mt-8 font-bold m-1 text-sm'>Worked Any Where</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6'>
        <div className='flex flex-col w-full px-1 mt-4' >
          <Label value='Worked Company Name' />
          <input disabled={!EditorMode} onChange={e => setcompany(e.target.value)} value={company} type="text" className='rounded-md shadow' />
        </div>
        <div className='flex flex-col w-full px-1  mt-4'>
          <Label value='Your Status' />
          <select disabled={!EditorMode} onChange={e => setstatus(e.target.value)} value={status} type="text" className='rounded-md shadow text-md'>
            <option value="0">Not Working</option>
            <option value="1">Working</option>
          </select>
        </div>

        <div className='flex flex-col w-full px-1 mt-4' >
          <Label value='Join Date' />
          <input disabled={!EditorMode} onChange={e => setJoinDate(e.target.value)} value={JoinDate} type="date" className='rounded-md shadow' />
        </div>
      </div>
      {
        EditorMode ? <button onClick={e => update()} className='mb-5 px-4 mx-1 shadow-md rounded py-1 text-white bg-black'>Update Resume</button> : <button onClick={e => setEditorMode(true)} className='mb-5 px-4 mx-1 shadow-md rounded py-1 text-white bg-black'>Edit Resume</button>
      }
    </div>
  )
}

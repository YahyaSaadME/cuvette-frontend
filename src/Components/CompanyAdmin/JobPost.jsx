import React, { useEffect, useState } from 'react'
import { RxCrossCircled } from "react-icons/rx";
import { Modal, Button, Alert, Tooltip } from "flowbite-react";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";

export default function JobPost() {
    const [title, setTitle] = useState('');
    const [requirements, setRequirements] = useState('');
    const [tags, setTags] = useState([]);
    const [newtag, setnewTag] = useState("");
    const [offerPriceEnd, setOfferPriceEnd] = useState(0);
    const [offerPriceStart, setOfferPriceStart] = useState(0);
    const [duration, setDuration] = useState(0);
    const [experinceStart, setExperinceStart] = useState(0);
    const [experinceEnd, setExperinceEnd] = useState(0);
    const [workType, setWorkType] = useState(0);
    const [skills, setSkills] = useState([]);
    const [newskill, setnewSkill] = useState('');
    const [extraBenifits, setExtraBenifits] = useState('');
    const [_id, setId] = useState('');
    const [jobType, setJobType] = useState(0);

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openViewModal, setopenViewModal] = useState([false, {}])
    const [cookie, setCookie] = useCookies(["company"]);
    const navigate = useNavigate()
    const [alertInModal, setAlertInModal] = useState([false, '', ''])
    const [Data, setData] = useState(null)
    const [viewMode, setviewMode] = useState(1)
    const [openProfileModal, setopenProfileModal] = useState([false, {}])
    const [job_id, setjob_id] = useState("")
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
            setId(data.id)
            setData(data)
            console.log(data);

        } else if (data.msg == "Account deleted") {
            const logout = setCookie("company", null);
            navigate("/mycompany/login")
        } else {
            navigate('/mycompany/login')
        }
    };
    const addTags = (e) => {
        if (newtag !== "") {
            setTags([...tags, newtag]);
            setnewTag("")
        }
    }
    const RemoveTags = (e) => {
        const idx = tags.indexOf(e)
        if (idx > -1) {
            tags.splice(idx, 1)
        }
        setTags([...tags]);
    }
    const addSkills = (e) => {
        if (newskill !== "") {
            setSkills([...skills, newskill]);
            setnewSkill("")
        }
    }
    const RemoveSkills = (e) => {
        const idx = skills.indexOf(e)
        if (idx > -1) {
            skills.splice(idx, 1)
        }
        setSkills([...skills]);
    }
    const addJob = async () => {
        if (title == "" || requirements == "" || tags.length == 0 || skills.length == 0) {
            setAlertInModal([true, 'red', 'Please fill all the details!'])
        } else {
            if (offerPriceEnd <= offerPriceStart) {
                setAlertInModal([true, 'red', 'Start Offer price is greater that End'])
            }
            else if (experinceEnd <= experinceStart) {
                setAlertInModal([true, 'red', 'Start Experience is greater that End'])
            } else {

                const sendData = await fetch("https://cuvette-server.vercel.app/company/job/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    mode: "cors",
                    body: JSON.stringify({ title, requirements, tags, offerPriceEnd, offerPriceStart, duration, experinceStart, experinceEnd, workType, skills, ExtraBenifits: extraBenifits, jobType, _id })
                });
                const data = await sendData.json()
                if (data.created == "success") {
                    setAlertInModal([true, 'success', data.msg])
                } else {
                    setAlertInModal([true, 'red', data.msg])
                }
            }
        }
    }
    const profile = async (id, applicant_id) => {
        const sendData = await fetch("https://cuvette-server.vercel.app/company/job/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({ _id: id })
        });
        const data = await sendData.json()
        if (data) {
            data.appliedCompanies.map((e, i) => {
                if (e.company_id == _id) {
                    setopenProfileModal([true, { ...data, proposal: e.proposal, applied_id: e._id, appliedOn: e.appliedOn, applicant_id }])
                }
            })
        }
    }
    const selectCandidate = async (id, applied_id, status, applicant_id) => {
        const sendData = await fetch("https://cuvette-server.vercel.app/company/job/select", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({ _id: id, applied_id, status, company_id: _id, job_id, applicant_id })
        });
        const data = await sendData.json()
        if (data.updated) {
            setAlertInModal([true, 'green',status==2?"Selected for Interview!":"Candidate Rejected!"])
        }else{
            setAlertInModal([true, 'red',data.msg])
        }
    }
        useEffect(() => {
            check()
            console.log(openProfileModal);
        }, [openProfileModal])

        return (
            // tags,duration, skills, ExtraBenifits
            <div className='py-24 px-4 '>
                <Modal className='mt-14' dismissible show={openAddModal} onClose={e => setOpenAddModal(false)}>
                    <Modal.Header>
                        <h5 className='text-2xl mb-4 font-bold'>Job Details</h5>
                        <Alert color={alertInModal[1]} show={alertInModal[0]} className='w-full'>
                            <h5>{alertInModal[2]}</h5>
                        </Alert>
                    </Modal.Header>
                    <Modal.Body>
                        <div>

                            <div className='mx-2'>
                                <div className='flex flex-col mb-2'>
                                    <label className='font-bold' htmlFor="title">Job Title</label>
                                    <input className='rounded-md shadow-md text-sm' placeholder='Eg. ML Engineer, Full Stack Developer' type="text" name="title" onChange={e => setTitle(e.target.value)} value={title} />
                                </div>
                                <div>
                                    <label className='font-bold' htmlFor="title">Offered Price</label>
                                    <div className='flex mb-2 jutsify-between items-center'>
                                        <div className='flex flex-col mr-2 w-full'>
                                            <input className='rounded-md shadow-md text-sm' placeholder='Starts from (In LPA)' type="number" name="setOfferPriceStart" onChange={e => setOfferPriceStart(Number(e.target.value))} value={offerPriceStart} />
                                        </div>-
                                        <div className='flex flex-col ml-2 w-full'>
                                            <input className='rounded-md shadow-md text-sm' placeholder='Ends with (In LPA)' type="number" name="setOfferPriceEnd" onChange={e => setOfferPriceEnd(Number(e.target.value))} value={offerPriceEnd} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className='font-bold' htmlFor="title">Experience Required</label>
                                    <div className='flex mb-2 jutsify-between items-center'>
                                        <div className='flex flex-col mr-2 w-full'>
                                            <input className='rounded-md shadow-md text-sm' placeholder='Starts from (In Months)' type="number" name="setExperinceStart" onChange={e => setExperinceStart(Number(e.target.value))} value={experinceStart} />
                                        </div>-
                                        <div className='flex flex-col ml-2 w-full'>
                                            <input className='rounded-md shadow-md text-sm' placeholder='Ends with (In Months)' type="number" name="setExperinceEnd" onChange={e => setExperinceEnd(Number(e.target.value))} value={experinceEnd} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex mb-2 jutsify-between items-center'>
                                        <div className='flex flex-col mr-2 w-full'>
                                            <label className='font-bold' htmlFor="title">Work Type</label>
                                            <select className='rounded-md shadow-md text-sm' onChange={e => setWorkType(Number(e.target.value))} value={workType} >
                                                <option value="0">On Site</option>
                                                <option value="1">Remote</option>
                                                <option value="2">Hybrid</option>
                                            </select>
                                        </div>
                                        <div className='flex flex-col ml-2 w-full'>
                                            <label className='font-bold' htmlFor="title">Job Type</label>
                                            <select className='rounded-md shadow-md text-sm' onChange={e => setJobType(Number(e.target.value))} value={jobType} >
                                                <option value="0">Full Time</option>
                                                <option value="1">Internship</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                {
                                    jobType == 1 ?

                                        <div>
                                            <div className='flex mb-2 jutsify-between items-center'>
                                                <div className='flex flex-col  w-full'>
                                                    <label className='font-bold' htmlFor="title">Duration</label>
                                                    <input className='rounded-md shadow-md text-sm' placeholder='Eg. 10 (In Months)' type="number" name="duration" onChange={e => setDuration(Number(e.target.value))} value={duration} />
                                                </div>
                                            </div>
                                        </div> : null
                                }
                                <div className='flex flex-col mb-2'>
                                    <label className='font-bold' htmlFor="EB" >Extra Benifits</label>
                                    <textarea className='rounded-md shadow-md text-sm' placeholder='Eg. Free work time, etc,...' type="text" name="title" onChange={e => setExtraBenifits(e.target.value)} value={extraBenifits}></textarea>
                                </div>

                            </div>
                            <div className='mx-2'>
                                <div className='flex flex-col mb-2'>
                                    <label className='font-bold' htmlFor="requirements">Job Reqirements</label>
                                    <textarea rows={8} className='rounded-md shadow-md text-sm' placeholder='Eg. ML Engineer, Full Stack Developer' type="text" name="requirements" onChange={e => setRequirements(e.target.value)} value={requirements} ></textarea>
                                </div>
                                <div className='flex flex-col mb-2'>
                                    <label className='font-bold' htmlFor="requirements">Add Skills Required</label>
                                    <div className='grid grid-cols-2'>
                                        {
                                            skills.length !== 0 ? skills.map((e, i) => {
                                                return <div key={i} className='flex items-center rounded-md mx-2 border py-2 px-2  my-2 shadow-md justify-between'>
                                                    <h5 key={i} className='text-sm'>{e}</h5>
                                                    <RxCrossCircled className='cursor-pointer' onClick={ele => RemoveSkills(e)} />
                                                </div>
                                            }) : null
                                        }
                                        <div className='flex w-full'>
                                            <input className='rounded-md shadow-md text-sm mx-2 my-2' placeholder='Add Skills' type="text" onChange={e => setnewSkill(e.target.value)} value={newskill} />
                                            <button className='ml-2' onClick={addSkills}>+</button>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col mb-2'>
                                    <label className='font-bold' htmlFor="requirements">Add Tags</label>
                                    <div className='grid grid-cols-2'>
                                        {
                                            tags.length !== 0 ? tags.map((e, i) => {
                                                return <div key={i} className='flex items-center rounded-md mx-2 border py-2 px-2  my-2 shadow-md justify-between'>
                                                    <h5 key={i} className='text-sm'>#{e}</h5>
                                                    <RxCrossCircled className='cursor-pointer' onClick={ele => RemoveTags(e)} />
                                                </div>
                                            }) : null
                                        }
                                        <div className='flex w-full'>
                                            <input className='rounded-md shadow-md text-sm mx-2 my-2' placeholder='Add Tags' type="text" onChange={e => setnewTag(e.target.value)} value={newtag} />
                                            <button className='ml-2' onClick={addTags}>+</button>
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-6'>
                                    <button className='rounded px-4 py-1 shadow-md bg-black text-white text-sm' onClick={addJob}>Add Job Post</button>
                                    <button className='rounded px-4 py-1 shadow-md bg-red-700 mx-2 text-white text-sm' onClick={e => setOpenAddModal(false)}>cancel</button>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                <Modal className='mt-14' dismissible show={openViewModal[0]} onClose={e => setopenViewModal([false, {}])} >
                    <Modal.Header> <div>
                        {openViewModal[1].title}<br></br>
                        <h2 className='border-none text-sm' >Posted on {new Date(openViewModal[1].date).getDate()} | {new Date(openViewModal[1].date).getMonth()} | {new Date(openViewModal[1].date).getFullYear()}</h2>
                    </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='flex w-full justify-evenly'>
                            <button className={`border px-4 py-2 shadow-md ${viewMode == 1 ? 'bg-black text-white' : 'bg-white text-black'} rounded-md`} onClick={ele => setviewMode(1)}>View Post</button>
                            <button className={`border px-4 py-2 shadow-md ${viewMode == 0 ? 'bg-black text-white' : 'bg-white text-black'} rounded-md`} onClick={ele => setviewMode(0)}>View Applicants</button>
                        </div>
                        {
                            viewMode == 1 ?
                                <div>
                                    <div className='mt-4 flex justify-evenly'>
                                        <div className='flex flex-col'>
                                            <div>
                                                <h2 className='border-none text-md font-bold text-center mt-4' >Offered price</h2>
                                                <div className='flex items-center justify-center'>
                                                    <h2 className='border-none text-sm' >{openViewModal[1].offerPriceStart}</h2> -
                                                    <h2 className='border-none text-sm' >{openViewModal[1].offerPriceEnd}</h2>
                                                </div>
                                            </div>
                                            <div>
                                                <h2 className='border-none text-md font-bold text-center mt-4' >Status</h2>
                                                <div className='flex items-center justify-center '>
                                                    <h2 className='border-none text-sm' >{openViewModal[1].status == 1 ? 'Active' : 'Deactive'}</h2>
                                                </div>
                                            </div>
                                            <div>
                                                <h2 className='border-none text-md font-bold text-center mt-4' >Job Type</h2>
                                                <div className='flex items-center justify-center'>
                                                    <h2 className='border-none text-sm' >{openViewModal[1].jobType == 0 ? "Full Time" : "Internship"}</h2>
                                                </div>
                                            </div>
                                            <div>
                                                <h2 className='border-none text-md font-bold text-center mt-4' >Skills Required</h2>
                                                <div className='grid grid-cols-2'>
                                                    {
                                                        openViewModal[1].skills ? openViewModal[1].skills.map((e, i) => <h2 key={i} className='text-sm px-2 py-1 border m-1 shadow-md rounded-md' >{e}</h2>) : null
                                                    }
                                                </div>
                                            </div>


                                        </div>
                                        <div className='flex flex-col'>
                                            <div>
                                                <h2 className='border-none text-md font-bold text-center mt-4' >Experience Required</h2>
                                                <div className='flex items-center justify-center'>
                                                    <h2 className='border-none text-sm' >{openViewModal[1].experinceStart}</h2> -
                                                    <h2 className='border-none text-sm' >{openViewModal[1].experinceEnd}</h2>
                                                </div>
                                            </div>
                                            <div>
                                                <h2 className='border-none text-md font-bold text-center mt-4' >Applicants</h2>
                                                <div className='flex items-center justify-center'>
                                                    <h2 className='border-none text-sm' >{openViewModal[1].applicants ? openViewModal[1].applicants.length : null}</h2>

                                                </div>
                                            </div>
                                            <div>
                                                <h2 className='border-none text-md font-bold text-center mt-4' >Experience Required</h2>
                                                <div className='flex items-center justify-center'>
                                                    <h2 className='border-none text-sm' >{openViewModal[1].workType == 0 ? "On Site" : openViewModal[1].workType == 1 ? "Remote" : "Hybrid"}</h2>
                                                </div>
                                            </div>
                                            <div>
                                                <h2 className='border-none text-md font-bold text-center mt-4' >Tags</h2>
                                                <div className='grid grid-cols-2'>
                                                    {
                                                        openViewModal[1].tags ? openViewModal[1].tags.map((e, i) => <h2 key={i} className='text-sm px-2 py-1 border m-1 shadow-md rounded-md' >{e}</h2>) : "No tags"
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {openViewModal[1].jobType == 0 ? null :
                                        <div>
                                            <h2 className='border-none text-md font-bold m-4' >Duration</h2>
                                            <h2 className='border-none text-sm' >{openViewModal[1].duration}</h2>
                                        </div>
                                    }
                                    <div>
                                        <h2 className='border-none text-md font-bold m-4' >Requirements</h2>
                                       <textarea value={openViewModal[1].requirements} className='border-none w-full' rows={15}></textarea>
                                    </div>                         

                                    <div>
                                        <h2 className='border-none text-md font-bold m-4' >Extra Benifits</h2>
                                        {openViewModal[1].extraBenifits == "" || openViewModal[1].extraBenifits == null ?
                                            <h2 className='border-none text-sm mx-4' >No Extra Benifits</h2>
                                            :
                                            <h2 className='border-none text-sm mx-4' >{openViewModal[1].extraBenifits}</h2>
                                        }
                                    </div>

                                </div>

                                : <div className='mt-10'>
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                                                    S.no
                                                </th><th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                                                    Id
                                                </th>
                                                <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                                                    status
                                                </th>
                                                <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                                                    Date
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">

                                            {
                                                openViewModal[1] ? openViewModal[1].applicants ? openViewModal[1].applicants.map((e, i) => {
                                                    const date = new Date(e.date)
                                                    return (
                                                        <tr key={i} className="cursor-pointer" onClick={ele => profile(e.userId, e._id)}>
                                                            <td className="px-6 text-center border py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                                {i + 1}
                                                            </td><td className="px-6 text-center border py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                                {e._id}
                                                            </td>
                                                            <td className={`px-6 text-center py-4 border whitespace-no-wrap text-sm leading-5`} style={{ color: e.status == 1 ? "#FACA15" : e.status == 2 ? "green" : "red" }}>
                                                                {e.status == 1 ? "Applied" : e.status == 2 ? "Selected" : "Rejected"}
                                                            </td>
                                                            <td className="px-2 w-32 text-center py-4 border whitespace-no-wrap text-sm leading-5 text-indigo-600 hover:text-indigo-900">
                                                                {date.getDate()} - {date.getMonth()} - {date.getFullYear()}
                                                            </td>
                                                        </tr>
                                                    )

                                                })

                                                    : null : null}
                                        </tbody>
                                    </table>
                                </div>
                        }
                    </Modal.Body>
                </Modal>
                <Modal className='mt-14' dismissible show={openProfileModal[0]} onClose={e => setopenProfileModal([false, {}])}>
                    <Modal.Body>
                        <div className='mx-4'>
                            <Alert color={alertInModal[1]} show={alertInModal[0]} className='w-full my-2'>
                                <h5>{alertInModal[2]}</h5>
                            </Alert>
                            <div className='flex justify-between'>
                                <h4 className='font-bold text-sm'>CANDIDATE NAME</h4>
                                <div className='bg-gray-300 p-1 rounded shadow-sm cursor-pointer' onClick={e => setopenProfileModal([false, {}])} >
                                    <RxCross2 className='text-gray-600 ' />
                                </div>
                            </div>
                            <h4 className='text-lg '>{openProfileModal[1].name}</h4>
                            <h4 className='font-bold text-sm mt-4'>CANDIDATE EMAIL</h4>
                            <Tooltip content="click to copy cursor-pointer">
                                <h4 >{openProfileModal[1].email}</h4>
                            </Tooltip>
                            
                            <h4 className='font-bold text-sm mt-4'>CANDIDATE SOCIALS</h4>
                            <h4 className='underline text-blue-800'>{openProfileModal[1].socials?openProfileModal[1].socials.github:null}</h4>
                            <h4 className='underline text-blue-800'>{openProfileModal[1].socials?openProfileModal[1].socials.linkedin:null}</h4>
                            <h4 className='underline text-blue-800'>{openProfileModal[1].socials?openProfileModal[1].socials.website:null}</h4>
                            <h4 className='font-bold text-sm mt-4'>CANDIDATE WORK EXPERIENCE</h4>
                            {
                                openProfileModal[1].experience>0?
                                <div>
                                    <h4 className=''>{openProfileModal[1].experience} Years</h4>
                                    <h4 className=''>{openProfileModal[1].jobTitle}</h4>
                                    <h4 className=''>{openProfileModal[1].company}</h4>
                                    <h4 className=''>{openProfileModal[1].status==1?"Working":"Not working"}</h4>
                                    <h4 className=''>Joined on {new Date(openProfileModal[1].JoinDate).getDate()} | {new Date(openProfileModal[1].JoinDate).getMonth()} | {new Date(openProfileModal[1].JoinDate).getFullYear()}</h4>
                                </div>:
                                <h4 className=''>No Experience</h4>
                            }
                            <hr className='mt-4'/>
                            <h4 className='font-bold text-sm mt-4'>CANDIDATE PROPOSAL</h4>
                            <textarea disabled value={openProfileModal[1].proposal} className='border-none w-full' rows={5}></textarea>
                            <hr className='mt-4'/>

                            <h4 className='font-bold text-sm mt-4'>CANDIDATE RESUME</h4>
                            <textarea disabled value={openProfileModal[1].resume} className='border-none w-full' rows={15}></textarea>
                        </div>
                        <hr className='m-4' />
                        <div className='flex justify-evenly mt-4'>
                            <button className='rounded px-4 shadow-md py-1 border bg-red-500 text-white' onClick={ele => selectCandidate(openProfileModal[1]._id, openProfileModal[1].applied_id, 0, openProfileModal[1].applicant_id)}>Reject</button>
                            <button className='rounded px-4 shadow-md py-1 border bg-green-500 text-white' onClick={ele => selectCandidate(openProfileModal[1]._id, openProfileModal[1].applied_id, 2, openProfileModal[1].applicant_id)}>Select for Interview</button>
                        </div>
                    </Modal.Body>
                </Modal>
                <div className='flex justify-center w-full items-center mb-5'>
                    <input type="text" className='rounded-md shadow-md  w-1/2 text-sm' placeholder='Search Title' />
                    <button className='bg-black text-white text-sm shadow-md mx-2 rounded-md px-3 py-2 '>Search</button>
                    <button className='bg-black text-white text-sm shadow-md rounded-md px-3 py-2 ' onClick={e => setOpenAddModal(true)}>New Post</button>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                                S.no
                            </th><th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                                status
                            </th>
                            <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                                Work Type
                            </th>
                            <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                                Applicants
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">

                        {
                            Data ? Data.Jobs.map((e, i) => {
                                const date = new Date(e.date)
                                return (
                                    // <tr onClick={ele => { setOpenModal([true, e]); find_member(e.userId) }} key={i} className="cursor-pointer">
                                    <tr key={i} className="cursor-pointer" onClick={ele => { setopenViewModal([true, e]); setjob_id(e._id) }}>
                                        <td className="px-6 text-center border py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                            {i + 1}
                                        </td><td className="px-6 text-center border py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                            {e.title}
                                        </td>
                                        <td className={`px-6 text-center py-4 border whitespace-no-wrap text-sm leading-5`} style={{ color: e.status == 1 ? "green" : "red" }}>
                                            {e.status == 1 ? "Active" : "Deactivated"}
                                        </td>
                                        <td className="px-6 text-center border py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                            {e.workType}
                                        </td>
                                        <td className="px-2 w-32 text-center py-4 border whitespace-no-wrap text-sm leading-5 text-indigo-600 hover:text-indigo-900">
                                            {date.getDate()} - {date.getMonth()} - {date.getFullYear()}
                                        </td>
                                        <td className="px-6 text-center py-4 border whitespace-no-wrap text-sm leading-5 text-indigo-600 hover:text-indigo-900">
                                            {e.applicants.length}
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
            </div >
        )
    }

import React, { useContext, useEffect, useState } from 'react'
import { Card, Dropdown, TextInput, Rating, Modal, Alert } from 'flowbite-react';
import { IoSearch } from "react-icons/io5";
import { FaShareAlt } from "react-icons/fa";
import { UserContext } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import { FaFilter } from "react-icons/fa";

export default function Company() {
    const { Company, User } = useContext(UserContext)
    const [openAlert, setopenAlert] = useState({ open: false, data: null, color: "" })
    const [Data, setData] = useState([])
    const [OpenFilters, setOpenFilters] = useState([false, null])
    const navigate = useNavigate()
    const [search, setsearch] = useState("")
    const all = async () => {
        const getUser = await fetch("http://localhost:5000/user/jobs", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
        });
        const data = await getUser.json()
        setData(data)
    }

    const searchJobs = async (search) => {
            const getUser = await fetch(`http://localhost:5000/user/job/search?search=${search}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
            });
            const data = await getUser.json()
            setData(data)
    }

    useEffect(() => {
        document.title = "Company | Place app"
        all()
    }, [])
    return (
        <>
            <div className='w-full flex justify-center mb-4 pt-24'>
                <TextInput className='w-1/2 mr-2' style={{ boxShadow: "2px 2px 8px -4px black", border: ".5px solid gray" }} type="text" icon={IoSearch} placeholder="Search Company...." onChange={e=>{setsearch(e.target.value);searchJobs(e.target.value)}} value={search} />
                <button onClick={e => setOpenFilters([true])} className='flex items-center px-3 py-2 rounded-md text-gray-600 text-sm' style={{ boxShadow: "2px 2px 8px -4px black", border: ".5px solid gray" }}>Filters <FaFilter className='ml-2' /></button>
            </div>
            <div className='w-full flex justify-center mb-10' style={{ display: "none" }}>
                <div className='w-3/4' style={{ boxShadow: "2px 2px 8px -4px black", border: ".5px solid gray" }}>

                </div>
            </div>

            <div className='max-w-3/4'>
                {
                    Data.length !== 0 ? Data.map((e, i) => {
                        const date = new Date(e.job.date)
                        return (
                            <div key={i} className='flex justify-center'>
                                <Card className="w-full border-2 m-2 mx-12 md:mx-2">
                                    <div className="flex justify-between px-2 pt-2">
                                        <div>
                                            <h5 className='text-2xl'>
                                                {e.job.title}
                                            </h5>
                                            <h5 className='text-sm text-gray-600'>
                                                {e.name}
                                            </h5>
                                            <h5 className='text-sm text-gray-600'>
                                                {e.address}
                                            </h5>
                                        </div>
                                        <FaShareAlt className='cursor-pointer' />
                                    </div>

                                    <div className="w-full">
                                        <div className='flex'>
                                            {
                                                e.job.skills.map((inData, i) => {
                                                    return (
                                                        <h5 key={i} className='text-sm px-3 py-2' style={{ backgroundColor: "#E5E7EB", margin: 2, borderRadius: 8 }}>{inData}</h5>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className='mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
                                            <div className='mx-2'>
                                                <h5 className='text-sm text-gray-500'>Job Offer</h5>
                                                <h5 className='text-md text-gray-800'>₹ {e.job.offerPriceStart} - ₹ {e.job.offerPriceEnd} {e.job.jobType == 1 ? "K" : "LPA"}</h5>
                                            </div>
                                            <div className='mx-4'>
                                                <h5 className='text-sm text-gray-500'>Experience</h5>
                                                <h5 className='text-md text-gray-800'>{e.job.experinceStart} - {e.job.experinceEnd} Years</h5>
                                            </div>
                                            {
                                                e.job.jobType == 1 ?
                                                    <div className='mx-4'>
                                                        <h5 className='text-sm text-gray-500'>Duration</h5>
                                                        <h5 className='text-md text-gray-800'>{e.job.duration} Months</h5>
                                                    </div> : <div className='mx-4'>
                                                        <h5 className='text-sm text-gray-500'>Top Package</h5>
                                                        <h5 className='text-md text-gray-800'>#Best</h5>
                                                    </div>
                                            }
                                            <div className='mx-4'>
                                                <h5 className='text-sm text-gray-500'>Work Type</h5>
                                                <h5 className='text-md text-gray-800'>{e.job.workType == 1 ? "Remote" : e.job.workType == 2 ? "Hybrid" : "On site"}</h5>
                                            </div>
                                            <div className='mx-4'>
                                                <h5 className='text-sm text-gray-500'>Job Type</h5>
                                                <h5 className='text-md text-gray-800'>{e.job.jobType == 1 ? "Internship" : "Full Time"}</h5>
                                            </div>
                                        </div>
                                        <div className='flex justify-between items-center mt-4'>
                                            <h5 className='text-sm text-gray-500 mx-2'>Posted on {date.getDate()} | {date.getMonth()} | {date.getFullYear()}</h5>
                                            <div className='flex'>
                                                <button className='mx-2 text-sm px-3 py-2' style={{ border: ".5px solid gray", borderRadius: 5 }} onClick={ele => navigate(`/job?jpid=${e.job._id}`)}>View Details</button>
                                                <button className='mx-2 text-sm bg-gray-900 px-3 text-white py-2' style={{ borderRadius: 5 }}>Apply Now</button>
                                            </div>
                                        </div>

                                    </div>

                                </Card>
                            </div>
                        )
                    }) : <div className='w-full flex justify-center items-center' style={{height:"90vh"}}>
                        <h2>No data found</h2>
                    </div>
                }


            </div>

        </>
    )
}

import React, { useContext, useEffect, useState } from 'react'
import CompanyCards from './Home/CompanyCards';
import inst from "../../assets/img/inst.png"
import { HiArrowNarrowRight } from 'react-icons/hi';
import { IoIosArrowUp } from "react-icons/io";
import { UserContext } from '../../Context/UserContext';
import { MdViewCarousel } from "react-icons/md";
import { Card } from 'flowbite-react';
import { FaFireAlt } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa6";
import { HiOutlineTrendingUp } from "react-icons/hi";
import AdminTimeLine from './Home/AdminTimeLine';
import AdminUsersGraph from './Home/AdminUsersGraph';
import AdminTopCompany from './Home/AdminTopCompany';
import { RiTeamLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const { User } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Home | Cuvette";
  }, [User])

  return (
    !User ?
      <div>
        <div className="launcher h-[100vh] sm:bg-top">
          <div className='h-full px-10 pt-[-10vh] sm:pt-0 flex flex-col justify-center items-center'>
            <h2 className="text-white font-extrabold text-center text-4xl mb-3">Start buildng your carrier.</h2>
            <h5 className="text-white  text-black text-md font-bold text-center mb-3">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut, nam!
            </h5>
            <button onClick={e => document.getElementById("main").scrollIntoView({ behavior: "smooth" })} className='text-xs sm:text-sm text-white bg-black px-4 py-2'>Explore Now</button>
          </div>
          <IoIosArrowUp style={{ width: 20, height: 20, color: "white" }} className="down-arrow" onClick={e => document.getElementById("main").scrollIntoView({ behavior: "smooth" })} />
          <div id='main'>
          </div>
        </div>
        <div className='h-64 flex items-center  m-8 mt-20 lg:m-28'>
          <div className='w-1/2 flex flex-col justify-center items-center' style={{ zIndex: 2 }}>
            <div className='z-5' >
              <h2 className="text-xl font-extrabold text-center sm:text-4xl mb-3">Build your passion.</h2>
              <h5 className="text-sm text-black sm:text-md font-bold text-center mb-3">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut, nam!
              </h5>
            </div>
            <button className='text-xs  sm:text-sm text-white bg-black px-4 py-2'>Explore Now</button>
          </div>
          <img src={inst} alt="" className='absolute sm:relative w-96 lg:w-1/2 lg:mt-10' />
        </div>
        <div className="px-4 mt-20">
          <div className="container mx-auto rounded-md flex flex-col md:flex-row justify-center">
          </div>
          <div className="flex justify-center w-full">
            <button className='text-xs  sm:text-sm text-white bg-black px-4 py-2 flex items-center'>
              Learn More
              <HiArrowNarrowRight className="ml-2 h-3 w-3" />
            </button>
          </div>
        </div>
        <div className='mt-10'>
          <ul className='grid p-10 w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'>
            <li className='font-bold shadow-md border rounded-md cursor-pointer text-xs border flex flex-col items-center w-full p-5 m-1 mx-3 shadow-md'>STUDENTS PLACED<span className='text-2xl sm:text-4xl  m-3'>14898+</span></li>
            <li className='font-bold shadow-md border rounded-md cursor-pointer text-xs border flex flex-col items-center w-full p-5 m-1 mx-3 shadow-md'>ACTIVE Company   <span className='text-2xl sm:text-4xl  m-3'>43+</span></li>
            <li className='font-bold shadow-md border rounded-md cursor-pointer text-xs border flex flex-col items-center w-full p-5 m-1 mx-3 shadow-md'>EVENTS         <span className='text-2xl sm:text-4xl  m-3'>16+</span></li>
            <li className='font-bold shadow-md border rounded-md cursor-pointer text-xs border flex flex-col items-center w-full p-5 m-1 mx-3 shadow-md'>HACKATHONS     <span className='text-2xl sm:text-4xl  m-3'>149+</span></li>
            <li className='font-bold shadow-md border rounded-md cursor-pointer text-xs border flex flex-col items-center w-full p-5 m-1 mx-3 shadow-md'>BOOTCAMPS          <span className='text-2xl sm:text-4xl  m-3'>184+</span></li>
            <li className='font-bold shadow-md border rounded-md cursor-pointer text-xs border flex flex-col items-center w-full p-5 m-1 mx-3 shadow-md'>PROJECTS       <span className='text-2xl sm:text-4xl  m-3'>178+</span></li>
          </ul>
        </div>
        <CompanyCards />
      </div>
      : <div>
        <div className="antialiased bg-gray-50 dark:bg-gray-900">
          <main className="p-4 pt-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <Card className="">
                <div className='flex items-center'>
                  <MdViewCarousel
                    style={{ width: 50, height: 50 }} />
                  <h5 className="text-2xl ml-3 font-bold text-gray-900 dark:text-white">
                    49+
                  </h5>
                </div>
                <h5 className="text-lg  font-bold text-gray-900 dark:text-white">
                  Total New Carousles
                </h5>
                <button className='bg-black sm:h-8 w-full text-white flex justify-center items-center p-2 sm: text-xs text-sm rounded'>
                  View Crousels
                  <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </Card>
              <Card className="">
                <div className='flex items-center'>
                  <FaFireAlt
                    style={{ width: 40, height: 40 }} />
                  <h5 className="text-2xl ml-3 font-bold text-gray-900 dark:text-white">
                    56+
                  </h5>
                </div>
                <h5 className="text-lg  font-bold text-gray-900 dark:text-white">
                  Total New Trendings
                </h5>
                <button className='bg-black sm:h-8 w-full text-white flex justify-center items-center p-2 sm: text-xs text-sm rounded'>
                  View Trendings
                  <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </Card>
              <Card className="">
                <div className='flex items-center'>
                  <FaNewspaper
                    style={{ width: 40, height: 40 }} />
                  <h5 className="text-2xl ml-3 font-bold text-gray-900 dark:text-white">
                    25+
                  </h5>
                </div>
                <h5 className="text-lg  font-bold text-gray-900 dark:text-white">
                  Total New News feeds
                </h5>
                <button className='bg-black sm:h-8 w-full text-white flex justify-center items-center p-2 sm: text-xs text-sm rounded'>
                  View News
                  <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </Card>
              <Card className="">
                <div className='flex items-center'>
                  <HiOutlineTrendingUp
                    style={{ width: 50, height: 50 }} />
                  <h5 className="text-2xl ml-3 font-bold text-gray-900 dark:text-white">
                    4+
                  </h5>
                </div>
                <h5 className="text-lg  font-bold text-gray-900 dark:text-white">
                  Tending Company
                </h5>
                <button className='bg-black sm:h-8 w-full text-white flex justify-center items-center p-2 sm: text-xs text-sm rounded'>
                  View Company
                  <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </Card>

            </div>

            <div
            >
              <h5 className='text-center text-2xl font-bold mt-6'>Today's Events</h5>
              <AdminTimeLine />
            </div>
            <div className='grid w-full grid-cols-1 lg:grid-cols-2'>
              <AdminUsersGraph />
              <AdminTopCompany />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <Card className="">
                <div className='flex items-center'>
                  <RiTeamLine
                    style={{ width: 40, height: 40 }} />
                  <h5 className="text-xl ml-3 font-bold text-gray-900 dark:text-white">
                    Company
                  </h5>
                </div>
                <h5 className="text-xl ml-3 font-bold text-gray-900 dark:text-white">
                  Totally there are 20 Company
                </h5>
                <div className='flex'>

                  <button className='mx-2 bg-black sm:h-8 w-full text-white flex justify-center items-center p-2 sm: text-xs text-sm rounded'>
                    Add
                    <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className='mx-2 bg-black sm:h-8 w-full text-white flex justify-center items-center p-2 sm: text-xs text-sm rounded'>
                    View
                    <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </Card>
              <Card className="">
                <div className='flex items-center'>
                  <RiTeamLine
                    style={{ width: 40, height: 40 }} />
                  <h5 className="text-xl ml-3 font-bold text-gray-900 dark:text-white">
                    Company
                  </h5>
                </div>
                <h5 className="text-xl ml-3 font-bold text-gray-900 dark:text-white">
                  Totally there are 20 Company
                </h5>
                <button className='mx-2 bg-black sm:h-8 w-full text-white flex justify-center items-center p-2 sm: text-xs text-sm rounded'>
                  View
                  <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </Card>
              <Card className="">
                <div className='flex items-center'>
                  <RiTeamLine
                    style={{ width: 40, height: 40 }} />
                  <h5 className="text-xl ml-3 font-bold text-gray-900 dark:text-white">
                    Company
                  </h5>
                </div>
                <h5 className="text-xl ml-3 font-bold text-gray-900 dark:text-white">
                  Totally there are 20 Company
                </h5>
                <button className='mx-2 bg-black sm:h-8 w-full text-white flex justify-center items-center p-2 sm: text-xs text-sm rounded'>
                  View
                  <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </Card>


            </div>
          </main>
        </div>

      </div>
  )
}

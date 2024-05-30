import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../Context/UserContext'
import { Spinner } from "flowbite-react";


export default function AppliedJobs() {

    const { Name, User, setCookie, cookie } = useContext(UserContext)
    
    useEffect(() => {
    }, [User])

    return (
        <div className='pt-16'>
            <h5 className='m-5 mt-8 font-bold text-2xl'>Your Proposals</h5>
            <div className='flex justify-center mx-5'>
                {User.appliedCompanies ?
                    <table className="w-full my-10 text-sm text-left text-gray-500 dark:text-gray-400">
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
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">

                            {

                                User.appliedCompanies.map((e, i) => {
                                    const date = new Date(e.appliedOn)
                                    return (
                                        <tr key={i} className="cursor-pointer" onClick={ele => { setopenViewModal([true, e]); setjob_id(e._id) }}>
                                            <td className="px-6 text-center border py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                {i + 1}
                                            </td><td className="px-6 text-center border py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                {e.name}
                                            </td>
                                            <td className={`px-6 text-center py-4 border whitespace-no-wrap text-sm leading-5`} style={{ color: e.status == 1 ? "orange" :e.status == 2? "green":"red" }}>
                                                {e.status == 1 ? "Applied" : e.status == 2 ? "Selected" : "Rejected"}
                                            </td>
                                            <td className="px-2 w-32 text-center py-4 border whitespace-no-wrap text-sm leading-5 text-indigo-600 hover:text-indigo-900">
                                                {date.getDate()} - {date.getMonth()} - {date.getFullYear()}
                                            </td>
                                        </tr>
                                    )
                                })



                            }
                        </tbody>
                    </table>
                    :
                    <div className='h-full w-full flex justify-center items-center' style={{ height: "90vh" }}>
                        <Spinner size="lg" />
                    </div>
                }
            </div>
        </div>
    )
}

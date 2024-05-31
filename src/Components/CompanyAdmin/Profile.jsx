import React, { useEffect, useState } from 'react'
import { Label, Alert } from 'flowbite-react'
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [EditorMode, setEditorMode] = useState(false)
    const [address, setaddress] = useState(0);
    const [phone, setphone] = useState("")
    const [website, setWebsite] = useState("")
    const [linkedin, setlinkedin] = useState("")
    const [about, setabout] = useState("")
    const [status, setstatus] = useState("")
    const [StartedAt, setStartedAt] = useState("")
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [alert, setalert] = useState([false])
    const [_id, setId] = useState("")
    const [User, setUser] = useState("")
    const [applicants, setapplicants] = useState(0)

    const [cookie, setCookie] = useCookies(["company"]);
    const navigate = useNavigate()

    const update = async () => {
        try {
            const getData = await fetch(`https://cuvette-server.vercel.app/company/profile/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
                body: JSON.stringify({ _id: User._id, address, email, name, about, applicants, linkedin, phone:Number(phone), website, status: Number(status), StartedAt: new Date(StartedAt) })
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
            setalert([true, 'red', 'Something went wrong!'])
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
            setId(data.id)
            setUser(data)
            console.log(data);

        } else if (data.msg == "Account deleted") {
            const logout = setCookie("company", null);
            navigate("/mycompany/login")
        } else {
            navigate('/mycompany/login')
        }
    };
    useEffect(() => {
        check()
        setaddress(User.address)
        setphone(User.phone)
        setWebsite(User.website)
        setlinkedin(User.linkedIn)
        setabout(User.about)
        setstatus(User.WorkingCompany ? User.WorkingCompany.status : "")
        setStartedAt(User.WorkingCompany ? User.WorkingCompany.StartedAt : "")
        setname(User.name)
        setemail(User.email)
        setapplicants(User.applicants?User.applicants.length:0)
    }, [User.address])


    return (
        <div className='pt-24 mb-10 px-10'>
            {alert[0] ?
                <Alert show={`${alert[0]}`} color={alert[1]} className='mx-4 mb-2'>
                    {alert[2]}
                </Alert> : null
            }
            <div className='mb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-2'>

                <div className='flex flex-col w-full px-1 mt-4' >
                    <Label value='Company Name' />
                    <input disabled={!EditorMode} onChange={e => setname(e.target.value)} value={name} type="text" className='rounded-md shadow' />
                </div>
                <div className='flex flex-col w-full px-1  mt-4'>
                    <Label value='Company Email' />
                    <input disabled={!EditorMode} onChange={e => setemail(e.target.value)} value={email} type="text" className='rounded-md shadow' />
                </div>
                <div className='flex flex-col w-full px-1  mt-4'>
                    <Label value='Company address' />
                    <input onChange={e => setaddress(e.target.value)} value={address} type="text" className='rounded-md shadow' />
                </div>
                <div className='flex flex-col w-full px-1  mt-4'>
                    <Label value='Company Linked In' />
                    <input disabled={!EditorMode} onChange={e => setlinkedin(e.target.value)} value={linkedin} type="text" className='rounded-md shadow' />
                </div>
                <div className='flex flex-col w-full px-1  mt-4'>
                    <Label value='Company Website' />
                    <input disabled={!EditorMode} onChange={e => setWebsite(e.target.value)} value={website} type="text" className='rounded-md shadow' />
                </div>
                <div className='flex flex-col w-full px-1  mt-4'>
                    <Label value='Company phone' />
                    <input disabled={!EditorMode} onChange={e => setphone(e.target.value)} value={phone} type="number" className='rounded-md shadow' />
                </div>
                <div className='flex flex-col w-full px-1  mt-4'>
                    <Label value='Company Status' />
                    <select disabled={!EditorMode} onChange={e => setstatus(e.target.value)} value={status} className='rounded-md shadow'>
                        <option value="1">Running</option>
                        <option value="0">End</option>
                    </select>
                </div>
                <div className='flex flex-col w-full px-1  mt-4'>
                    <Label value='Company phone' />
                    <input disabled={!EditorMode} onChange={e => setStartedAt(e.target.value)} value={StartedAt} type="date" className='rounded-md shadow' />
                </div>
                <div className='flex flex-col w-full px-1  mt-4'>
                    <Label value='Company About' />
                    <textarea disabled={!EditorMode} onChange={e => setabout(e.target.value)} value={about} rows={10} className='rounded-md shadow'></textarea>
                </div>
                
            </div>
            
            {
                EditorMode ? <button onClick={e => update()} className='mb-5 px-4 mx-1 shadow-md rounded py-1 text-white bg-black'>Update Resume</button> : <button onClick={e => setEditorMode(true)} className='mb-5 px-4 mx-1 shadow-md rounded py-1 text-white bg-black'>Edit Profile</button>
            }
        </div>
    )
}

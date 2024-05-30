import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/UserContext'
import { Alert } from 'flowbite-react'

export default function Resume() {
    const { Name, User, setCookie, cookie, check } = useContext(UserContext)
    const [EditorMode, setEditorMode] = useState(false)
    const [editor, seteditor] = useState("")
    const [alert, setalert] = useState([false])

    const add = async () => {
        try {
            const getData = await fetch(`http://localhost:5000/user/profile/resume`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
                body: JSON.stringify({ _id: User._id, doc: editor })
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
    useEffect(() => {
        seteditor(User.resume)
    }, [User, EditorMode])

    return (
        <div className='pt-16'>
            <h5 className='m-7 mt-8 font-bold text-2xl'>Your Resume</h5>
            {alert[0] ?
                <Alert show={`alert[0]`} color={alert[1]} className='mx-4 mb-2'>
                    {alert[2]}
                </Alert> : null
            }
            <div className='px-4 w-full'>

                <p className='text-sm mb-5'>
                    {
                        EditorMode == false ? <textarea rows={15} className=' p-4 my-6 px-4 w-full rounded-md shadow-md' value={User.resume}> </textarea>:
                        <textarea onChange={e => seteditor(e.target.value)} value={editor} className='p-4 my-6 px-4 w-full rounded-md shadow-md' rows={15}> </textarea>
                    }
                </p>
                {
                    EditorMode ? <button onClick={e => add()} className='mb-5 px-4 shadow-md rounded py-1 text-white bg-black'>Add (or) Update Resume</button> : <button onClick={e => setEditorMode(true)} className='mb-5 px-4 shadow-md rounded py-1 text-white bg-black'>Edit Resume</button>
                }
            </div>
        </div>
    )
}

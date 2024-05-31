import { createContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';

const UserContext = createContext();


const UserProvider = ({ children }) => {
    const [Loader, setLoader] = useState(true)
    const [cookie, setCookie] = useCookies(["user"]);
    const [Name, setName] = useState("")
    const [UserData, setUserData] = useState({})
    const [Company, setCompany] = useState([])


    const check = async () => {
        try {
            const getUser = await fetch("https://cuvette-server.vercel.app/user/protected", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
                body: JSON.stringify({ token: cookie.user }),
            });
            const { msg, data } = await getUser.json();

            if (msg == "Access granted") {
                setName(data.name.slice(0, 2))
                setUserData(data)
                setCookie(['user', data])
            }
            if (msg == "User not found!") {
                setCookie(['user', null])
            }
        } catch (error) {

        }
    };

    useEffect(() => {
        check()
        setLoader(false)
    }, [Loader])
    return (
        <UserContext.Provider value={{
            Company,
            Loader,
            setLoader,
            Name,
            User: UserData,
            cookie,
            setCookie,
            check
        }}>
            {children}
        </UserContext.Provider>

    )
}

export { UserProvider, UserContext }
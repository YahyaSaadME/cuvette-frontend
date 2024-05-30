import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import HomeGraph from './Home/HomeGraph';

export default function CompanyHome() {
  const navigate = useNavigate()
  const [cookie, setCookie] = useCookies(["company"]);
  
  const check = async () => {
    const getUser = await fetch("http://localhost:5000/company/protected", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ token: cookie.company }),
    });
    const { msg } = await getUser.json();
    console.log(msg);
    if (msg != "Access granted") {
      if(msg == "Account deleted"){
        setCookie(["company",null])
      }
        navigate('/mycompany/login')
    }
  }
  useEffect(() => {
    check()
  }, [])


  return (
    <div className='pt-20'>

      <HomeGraph />
    </div>
  )
}

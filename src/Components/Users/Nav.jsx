import { Dropdown, Navbar } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Nav() {
  const [shownav, setShownav] = useState(true);
  const { Name, User, setCookie, cookie } = useContext(UserContext)
  const [bg, setbg] = useState("transparent")
  const location = useLocation();
  const [mainLoction, setmainLoction] = useState()
  const navigate = useNavigate()
  
  const signOut = async () => {
    const logout = setCookie('user', null)
    navigate("/")
  }

  useEffect(() => {
    if (location.pathname == "/signup" || location.pathname == "/login") {
      setShownav(false);
    } else {
      setShownav(true);
    }
    if (location.pathname == "/") {
      setbg("transparent")
    } else {
      setbg("black")
    }
    setmainLoction(location.pathname)
  }, [location]);


  const width = () => {
    window.innerWidth < 768 ? setbg("black") : setbg("transparent")
    mainLoction != "/" ? setbg("black") : setbg("transparent")
  }
  const scroll = () => {
    // window.innerWidth > 768 ? window.scrollY < 300 ? setbg("transparent") : setbg("black") : null
    window.innerWidth > 768 ? mainLoction == "/" ? window.scrollY < 300 ? setbg("transparent") : setbg("black") : setbg("black") : setbg("black")
  }
  window.addEventListener('resize', e => {
    width()
  })
  window.addEventListener('scroll', e => {
    scroll()
  })
  useEffect(() => {
    scroll()
    width()
  }, [])


  if (shownav) {
    return (
      <>
        {/* <div className="w-full fixed z-10" style={{ display: loader ? "none" : null }}> */}
        <div className="w-full fixed z-10">
          <Navbar fluid className="bg-black" style={{ backgroundColor: bg, transition: "1s ease" }}>
            <Navbar.Brand>
              <Link to="/" className="self-center whitespace-nowrap text-2xl font-semibold text-white">
                Cuvette
              </Link>
            </Navbar.Brand>
            {cookie.user ? (
              <div className="flex md:order-2 shadow-lg">
                <Dropdown
                  arrowIcon={false}
                  inline
                  className="bg-black border-2 mt-2 w-48"
                  label={
                    <div className="w-10 h-10 mx-1 bg-white rounded-lg flex justify-center items-center">
                      <h1 className="text-md font-bold">{Name.toUpperCase()}</h1>
                    </div>
                  }
                >
                  <Dropdown.Header className="border-none">
                    <div className="flex">
                      <div className="mr-4 w-16 h-16 mx-1 bg-white rounded-lg flex justify-center items-center">
                        <h1 className="text-lg font-bold">{Name.toUpperCase()}</h1>
                      </div>
                      <div>
                        <span className="block text-lg text-white">
                          {User.name}
                        </span>
                        <span className="block truncate text-md font-medium text-white">
                          {User.email}
                        </span>
                      </div>
                    </div>
                  </Dropdown.Header>
                  <Dropdown.Item><Link to="/" className="text-white hover:text-black">Dashboard</Link></Dropdown.Item>
                  <Dropdown.Item><Link to="/profile" className="text-white hover:text-black">My Profile</Link></Dropdown.Item>
                  <Dropdown.Item><Link to="/profile/resume" className="text-white hover:text-black">My Resume</Link></Dropdown.Item>
                  <Dropdown.Item><Link to="/jobs/applied" className="text-white hover:text-black">Applied Jobs</Link></Dropdown.Item>
                  <Dropdown.Item onClick={signOut}><h5 className="text-white hover:text-black">Sign Out</h5></Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
              </div>
            ) : <Navbar.Toggle />}
            {cookie.user ? (
              <Navbar.Collapse>
                <Link to="/" className="text-white border-0 mt-8 mb-4 text-center md:mt-0 md:mb-0">
                  Home
                </Link>
                <Link to="/Company" className="text-white border-0 mt-8 mb-4 text-center md:mt-0 md:mb-0">
                  Company
                </Link>
                <Link to="/" className="text-white border-0 mt-8 mb-4 text-center md:mt-0 md:mb-0">
                  News
                </Link>
                <Link to="/" className="text-white border-0 mt-8 mb-8 text-center md:mt-0 md:mb-0">
                  Trendings
                </Link>
                <Link to="/" className="text-white border-0 mt-8 mb-4 text-center md:mt-0 md:mb-0">
                  About
                </Link>
              </Navbar.Collapse>
            ) : (
              <Navbar.Collapse >
                <Link to="/" className={"text-white border-0 text-center mt-8 p-1 mb-4 md:mt-0 md:mb-0"}>
                  Home
                </Link>
                <Link to="/Company" className="text-white border-0 text-center mt-8 p-1 mb-4 md:mt-0 md:mb-0">
                  Jobs
                </Link>
                <Link to="/" className="text-white border-0 text-center mt-8 p-1 mb-4 md:mt-0 md:mb-0">
                  News
                </Link>
                <Link to="/" className="text-white border-0 text-center mt-8 p-1 mb-4 md:mt-0 md:mb-0">
                  Trendings
                </Link>
                <Link to="/" className="text-white border-0 text-center mt-8 p-1 mb-4 md:mt-0 md:mb-0">
                  About
                </Link>
                <Link
                  to="/signup"
                  className="text-black p-1 px-2 bg-white border-0 text-center mt-8 mb-4 md:mt-0 md:mb-0"
                >
                  Sign Up
                </Link>
              </Navbar.Collapse>
            )}
          </Navbar></div>
        {/* {bg == "black" ? <div className="pt-12"></div> : null} */}

      </>
    );
  } else {
    return "";
  }
}

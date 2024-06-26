import { Footer } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';

export default function UserFooter() {
  const [showFooter, setShowFooter] = useState(true)
  useEffect(() => {
    if (location.pathname == "/signup" || location.pathname == "/login") {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, [])

  return (
    <Footer container className='bg-black text-white' style={{ borderRadius: 0, display: showFooter ? null : "none" }}>
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <h5 className='font-bold text-2xl mb-2'>
            Cuvette
          </h5>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            by="Powered by Yahya saad."
            href="#"
            year={2024}
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon
              href="#"
              icon={BsFacebook}
            />
            <Footer.Icon
              href="#"
              icon={BsInstagram}
            />
            <Footer.Icon
              href="#"
              icon={BsTwitter}
            />
            <Footer.Icon
              href="#"
              icon={BsGithub}
            />
          </div>
        </div>
      </div>
    </Footer>
  )
}



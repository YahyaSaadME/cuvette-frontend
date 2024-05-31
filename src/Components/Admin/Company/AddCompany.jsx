import { Alert, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { IoMdCloseCircle } from "react-icons/io";

export default function AddCompany() {
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Company_founder_name, setCompany_founder_name] = useState("");
  const [About, setAbout] = useState("");
  const [purpose, setPurpose] = useState("");
  const [logoSaved, setLogoSaved] = useState([null, ""])
  const [VDocsSaved, setVDocsSaved] = useState([false, ""])
  const [MainWarning, setMainWarning] = useState([false, "Please fill all the fields!"])
  const [MainSuccess, setMainSuccess] = useState([false, ""])
  const createCompany = async (e) => {
    e.preventDefault();
    if (Name == "" || email == "" || Company_founder_name == "" || About == "" || purpose == "" || logoSaved[0] == false || VDocsSaved[0] == false) {
      setMainSuccess([false, ""])
      setMainWarning([true, "Please fill all the fields!"])
    } else {
      const send = await fetch("https://cuvette-server.vercel.app/admin/addCompany", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",

        body: JSON.stringify({
          name: Name,
          email: email,
          about: About,
          founder: Company_founder_name,
          statement: purpose,
          docs: VDocsSaved[1],
          logo: logoSaved[1]
        }),
      });
      const res = await send.json();
      console.log(res);
      if (res.created === false) {
        setMainWarning([true, res.msg])
        setMainSuccess([false, ""])
      } else {
        setMainWarning([false, ""])
        setMainSuccess([true, "Company Created sucessfully."])

      }
    }
  };

  const uploadLogo = async (e) => {

    try {

      const formData = new FormData();
      formData.append('logo', e);
      const send = await fetch("https://cuvette-server.vercel.app/admin/Companylogo", {
        method: "POST",
        mode: "cors",
        body: formData,
      });
      const res = await send.json()

      if (res.msg == "Done") {
        setLogoSaved([true, res.path])
      } else {
        setLogoSaved([false, ""])
      }
    } catch (e) {
      setLogoSaved([false, "File not uploaded"])
    }
  };
  const uploadVDocs = async (e) => {
    const formData = new FormData();
    formData.append('verification', e);
    const send = await fetch("https://cuvette-server.vercel.app/admin/Companyverificationdocs", {
      method: "POST",
      mode: "cors",
      body: formData,

    });
    const res = await send.json()
    console.log(res);
    if (res.msg == "Done") {
      setVDocsSaved([true, res.path])
    } else {
      setVDocsSaved([false, ""])
    }
  };
  return (
    <div className="flex justify-center w-full p-6 sm:p-16">
      <div className="fixed" style={{ zIndex: 10, width: "100%", top: 60 }} id="notif">
        <div className="flex w-full justify-center items-center">
          <Alert color="failure" icon={HiInformationCircle} className="mx-4" style={{ display: MainWarning[0] ? null : "none" }}>
            <span className="flex justify-center items-center">
              <p>
                <span className="font-medium mr-2">{MainWarning[1]}</span>
              </p>
              <IoMdCloseCircle size={20} className="cursor-pointer" onClick={e => { setMainWarning([false, ""]) }} />
            </span>
          </Alert>
          <Alert color="success" icon={HiInformationCircle} className="mx-4" style={{ display: MainSuccess[0] ? null : "none" }}>
            <span className="flex justify-center items-center">
              <p>
                <span className="font-medium">{MainSuccess[1]}</span>
              </p>
              <IoMdCloseCircle size={20} className="cursor-pointer" onClick={e => { setMainWarning([false, ""]) }} />
            </span>
          </Alert>
        </div>
      </div>
      <form action="/" style={{ width: "100%" }}>
        <div className="container flex flex-col gap-4 rounded-lg px-3  pt-10">
          <h2 className="text-center font-bold text-2xl mt-4">Add New Company</h2>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="Company_name" value="Company Name" />
            </div>
            <TextInput
              id="Company_name"
              placeholder="Enter your Company name"
              required
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={Name}
            />
          </div>
          <div className="flex md:flex-row flex-col w-full">
            <div className="md:w-1/2 w-full mr-1">
              <div className="mb-2 block">
                <Label htmlFor="Company_founder_email" value="Founder's Email" />
              </div>
              <TextInput
                id="Company_founder_email"
                placeholder="Enter your Company founder's email"
                required
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="md:w-1/2 w-full ml-1">
              <div className="mb-2">
                <Label htmlFor="Company_founder_name" value="Founder's Name" />
              </div>
              <TextInput
                id="Company_founder_name"
                placeholder="Enter your Company founder's name"
                required
                type="text"
                onChange={(e) => setCompany_founder_name(e.target.value)}
                value={Company_founder_name}
              />
            </div>
          </div>

          <div className="flex md:flex-row flex-col w-full">
            <div className="md:w-1/2 w-full mr-1">
              <div className="mb-2 ">
                <Label htmlFor="Company_about" value="About Company" />
              </div>
              <TextInput
                id="Company_about"
                placeholder="Enter about  your Company"
                required
                type="text"
                onChange={(e) => { setAbout(e.target.value) }}
                value={About}
              />
            </div>
            <div className="md:w-1/2 w-full ml-1">
              <div className="mb-2 block">
                <Label
                  htmlFor="Company_purpose"
                  value="Statement purppose of your Company"
                />
              </div>
              <TextInput
                id="Company_purpose"
                placeholder="Enter statement of purppose"
                required
                type="text"
                onChange={(e) => setPurpose(e.target.value)}
                value={purpose}
              />
            </div>

          </div>

          <div className="flex md:flex-row flex-col w-full">
            <div className="md:w-1/2 w-full mr-1">
              <div className="mb-2 block">
                <Label htmlFor="Company_logo" value="Upload Company Logo" />
              </div>
              <div style={{ display: logoSaved == null ? "none" : logoSaved == false ? null : "none" }}>
                <Alert
                  color="failure"
                  icon={HiInformationCircle}
                >
                  <span>
                    <p>
                      File not uploaded
                    </p>
                  </span>
                </Alert>
              </div>
              <TextInput
                id="Company_logo"
                type="file"
                onChange={(e) => { uploadLogo(e.target.files[0]) }}
              />
            </div>
            <div className="md:w-1/2 w-full ml-1">
              <div className="mb-2 block">
                <Label htmlFor="Company_docs" value="Upload Verified Documents" />
              </div>
              <TextInput
                id="Company_docs"
                type="file"
                onChange={(e) => { uploadVDocs(e.target.files[0]) }}
              />
            </div>
          </div>

          <button
            onClick={createCompany}
            className="border-2 border mb-4 rounded-lg pt-2 pb-2 bg-black text-white"
            required
          >
            Add Company
          </button>
        </div>
      </form>
    </div>
  );
}

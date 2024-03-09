import React, { useContext, useState, useEffect } from "react";
import { HTTP_METHODS } from "@/constants/httpMethods";
import httpRequest from "@/utils/httpRequest";
import ServiceProviderCard from "@/components/dashboard/client/ServiceProviderCard";
import { AiOutlineSearch } from "react-icons/ai"
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { CiFilter } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";




const DashboardClientProfile = () => {
  const router = useRouter()
  const [currentSkill, setCurrentSkill] = useState("");
  const [serviceProviders, setServiceProviders] = useState([]);
  const [skills, setSkills] = useState([
    "C++",
    "Java",
    "HTML",
    "CSS",
    // "JavaScript",
    // "ReactJS",
    // "NodeJS",
    // "ExpressJS",
    // "MongoDB",
  ]);
  
  useEffect(() => {
    getVerifiedServiceProviders()
  }, []);

  function valuetext(value) {
    return `${value}°C`;
  }
  const handleCurrentSkill = (e) => {
    setCurrentSkill(e.target.value);
  };
  
  const handleSkills = (deleteSkill) => {
    setSkills((currentSkills) => {
      return currentSkills.filter((skill) => skill != deleteSkill);
    });
  };
  
  const addSkill = (skill) => {
    if (skill.trim() !== "") {
      setSkills([...skills, skill]);
      setCurrentSkill("");
    }
  };

  const getVerifiedServiceProviders = async () => {
    const { success, message, data } = await httpRequest("/api/client/serviceProviders", HTTP_METHODS.GET);
    if (success) {
      setServiceProviders(data.serviceProviders);
    } else {
      alert(message);
    }
  }
  const isFiltered = (data) => {
    console.log(data);
    return true;
  }

  const contact = async (id) => {
    const chat_id = 123;
    router.push(`/dashboard/chat/${chat_id}`)
  }

  return (
    <div className="flex">
      {/* Filter section */}
      <div className="flex-col basis-[20%]">
        <div className='flex items-center justify-center mt-6'>
          <AiOutlineSearch className='text-[1rem] relative left-52 cursor-pointer' />
          <input type="text" placeholder='Search...' className='text-[1rem] bg-primary-lightGray sm:p-[.4em] sm:px-[.8em] rounded-xl outline-none h-12' />
        </div>
        <h1 className="flex justify-center my-6 text-xl font-semibold">~~~~~OR~~~~~</h1>
        <h1 className="flex justify-center my-6 text-2xl text-primary-navy font-bold items-center"><CiFilter />Filter</h1>
        <div>
          <h1 className="flex justify-center my-6 text-xl font-semibold">Experience</h1>
          <Box sx={{ width: 200 }} className="flex mx-auto">
            <Slider
              aria-label="Always visible"
              defaultValue={1}
              getAriaValueText={valuetext}
              valueLabelDisplay="on"
              shiftStep={1}
              step={1}
              min={1}
              max={10}
            />
          </Box>
        </div>
        <h1 className="flex justify-center my-6 text-xl font-semibold">Skills</h1>
        {/* first box */}
        <div className="flex gap-1 sm:gap-2 ml-[5%]">
          <div className="flex bg-[#f8f6f5] h-12 border border-[#555] rounded-lg px-2 justify-center">
            <input
              className="bg-[#f8f6f5] outline-none text-xl"
              type="text"
              value={currentSkill}
              onChange={handleCurrentSkill}
            ></input>
            <div
              className="pt-3 cursor-pointer"
              onClick={() => addSkill(currentSkill)}
            >
              <IoIosAddCircleOutline className="text-2xl" />
            </div>
          </div>
        </div>

        {/* second box starts */}
        <div
          className={`border border-[#555] rounded-lg text-xl flex flex-wrap p-2 gap-2 ml-[5%] mr-[-5%] mt-1 ${skills.length === 0 ? "hidden" : "flex"
            }`}
        >
          {skills.map((skill, index) => {
            return (
              <div
                key={index}
                className="py-1 pl-2 pr-1 rounded-full bg-primary-light border border-[#555] flex gap-1 sm:gap-2 md:gap-4"
              >
                <p>{skill}</p>
                <div
                  className="cursor-pointer"
                  onClick={() => handleSkills(skill)}
                >
                  <IoCloseCircleOutline className="text-2xl" />
                </div>
              </div>
            );
          })}
        </div>
        <Link href="" className=" flex justify-center">
          <button className="font-semibold p-2 mr-[-6px] bg-primary-navy rounded-xl text-white text-xl md:ml-7 hover:shadow-xl mt-6">
            Apply
          </button>
        </Link>
      </div>

      {/* Lawyers section */}
      <div className="flex-col basis-[80%]">
        <h1 className="text-center text-3xl py-4 md:text-4xl text-primary-navy font-semibold ">Verified Lawyers</h1>
        <div className="flex justify-center flex-col">
          
          {serviceProviders.filter((data)=> isFiltered(data)).map((data) => <ServiceProviderCard key={data["_id"]} serviceProvidersDetail={data} contact={()=>contact(data["_id"])} ></ServiceProviderCard>)}
        </div>
      </div>
    </div>
    )
};

export default DashboardClientProfile;

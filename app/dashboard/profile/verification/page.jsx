"use client";
import React, { useState } from "react";
import CloseIcon from "./assets/closeIcon";
import AddIcon from "./assets/addIcon";
import httpRequest from "@/utils/httpRequest";
import { HTTP_METHODS } from "@/constants/httpMethods";
import { useRouter } from "next/navigation";

const Verification = () => {
  const router = useRouter();
  const [imageData, setImageData] = useState(null);
  const [profilePicture, setprofilePicture] = useState(null);
  const [currentSkill, setCurrentSkill] = useState("");
  const [yoe, setYoe] = useState(null);
  const [documentSizes, setDocumentSizes] = useState({
    aadharCard: 0,
    panCard: 0,
    qualification: 0,
  });
  const [skills, setSkills] = useState([
    // "C++",
    // "Java",
    // "HTML",
    // "CSS",
    // "JavaScript",
    // "ReactJS",
    // "NodeJS",
    // "ExpressJS",
    // "MongoDB",
  ]);

  const [documents, setDocuments] = useState({
    aadharCard: null,
    panCard: null,
    qualification: null,
  });

  const [agreeCondition, setAgreeCondition] = useState(false);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setprofilePicture(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitVerification = () => {
    if (
      documentSizes.aadharCard > 1024 * 1024 ||
      documentSizes.panCard > 1024 * 1024 ||
      documentSizes.qualification > 1024 * 1024 ||
      !agreeCondition
    )
      return;
    const form = new FormData();
    form.set("profilePicture", profilePicture);
    form.set("aadharCard", documents.aadharCard);
    form.set("panCard", documents.panCard);
    form.set("qualification", documents.qualification);
    form.set("experience", yoe);
    form.set("skills", JSON.stringify(skills));

    httpRequest(
      `/api/serviceProvider/auth/accountVerification`,
      HTTP_METHODS.POST,
      form,
      true
    ).then((res) => {
      if (res.success) {
        router.replace("/dashboard/profile");
        // alert(res.message);
      } else {
        alert(res.message);
      }
    });
  };

  return (
    <div className="p-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitVerification();
        }}
      >
        <div className="flex flex-col gap-3 md:gap-6 sm:w-1/2 mx-auto my-4 sm:my-10 md:my-20">
          <h1 className="text-3xl md:text-5xl font-bold text-center">
            Verification
          </h1>

          <div className="text-center">
            {/* <label htmlFor="file" className="text-md sm:text-xl md:text-2xl">
              Upload Profile
            </label> */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="profileImageInput"
              style={{ display: "none" }}
              className="mx-auto"
            />
            <label htmlFor="profileImageInput">
              <div
                style={{
                  width: "150px",
                  height: "150px",
                  border: "1px solid #ccc",
                  borderRadius: "50%",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                className="mx-auto"
              >
                {imageData ? (
                  <img
                    src={imageData}
                    alt="Profile"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                ) : (
                  "Upload Profile"
                )}
              </div>
            </label>
          </div>

          <div className="flex flex-col gap-1 sm:gap-2">
            <label htmlFor="file" className="text-md sm:text-xl md:text-2xl">
              Upload Aadhar Card
            </label>

            <input
              className="block bg-primary-light p-2 rounded-lg border border-[#555] file:bg-[#262924] file:py-2 file:px-4 file:rounded-lg file:text-white file:border-none file:mr-3"
              type="file"
              onChange={(e) => {
                setDocumentSizes({
                  ...documentSizes,
                  aadharCard: e.target.files[0].size,
                });
                setDocuments({ ...documents, aadharCard: e.target.files[0] });
              }}
              accept=".pdf"
            ></input>
            {documentSizes.aadharCard > 1024 * 1024 && (
              <p className="text-red-700">
                Please upload document less than 1MB
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1 sm:gap-2">
            <label htmlFor="file" className="text-md sm:text-xl md:text-2xl">
              Upload Pan Card
            </label>
            <input
              className="block bg-primary-light p-2 rounded-lg border border-[#555] file:bg-[#262924] file:py-2 file:px-4 file:rounded-lg file:text-white file:border-none file:mr-3"
              type="file"
              onChange={(e) => {
                setDocumentSizes({
                  ...documentSizes,
                  panCard: e.target.files[0].size,
                });
                setDocuments({ ...documents, panCard: e.target.files[0] });
              }}
              accept=".pdf"
            ></input>
            {documentSizes.panCard > 1024 * 1024 && (
              <p className="text-red-700">
                Please upload document less than 1MB
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1 sm:gap-2">
            <label htmlFor="file" className="text-md sm:text-xl md:text-2xl">
              Upload Degree/License/Certificate
            </label>
            <input
              className="block bg-primary-light p-2 rounded-lg border border-[#555] file:bg-[#262924] file:py-2 file:px-4 file:rounded-lg file:text-white file:border-none file:mr-3"
              type="file"
              onChange={(e) => {
                setDocumentSizes({
                  ...documentSizes,
                  qualification: e.target.files[0].size,
                });
                setDocuments({
                  ...documents,
                  qualification: e.target.files[0],
                });
              }}
              accept=".pdf"
            ></input>
            {documentSizes.qualification > 1024 * 1024 && (
              <p className="text-red-700">
                Please upload document less than 1MB
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1 sm:gap-2">
            <label htmlFor="file" className="text-md sm:text-xl md:text-2xl">
              Year Of Experience
            </label>
            <div className="flex bg-[#f8f6f5] h-14 border border-[#555] rounded-lg px-2">
              <input
                className="block w-full bg-[#f8f6f5] outline-none text-xl"
                type="number"
                value={yoe}
                min={0}
                onChange={(e) => setYoe(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="flex flex-col gap-1 sm:gap-2">
            <label htmlFor="file" className="text-md sm:text-xl md:text-2xl">
              Add Skills
            </label>
            <div className="flex bg-[#f8f6f5] h-14 border border-[#555] rounded-lg px-2">
              <input
                className="block w-full bg-[#f8f6f5] outline-none text-xl"
                type="text"
                value={currentSkill}
                onChange={handleCurrentSkill}
              ></input>
              <div
                className="pt-3 cursor-pointer"
                onClick={() => addSkill(currentSkill)}
              >
                <AddIcon />
              </div>
            </div>
          </div>
          <div
            className={`border border-[#555] rounded-lg text-xl flex flex-wrap p-2 gap-2 ${
              skills.length === 0 ? "hidden" : "block"
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
                    <CloseIcon />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-2">
            <div className="py-1">
              <input
                type="checkbox"
                className="accent-primary h-4 w-4"
                name=""
                id=""
                checked={agreeCondition}
                onChange={() => setAgreeCondition(!agreeCondition)}
              />
            </div>
            <p className="text-lg font-semibold text-[#929298]">
              I agree to the{" "}
              <a className="text-primary cursor-pointer">
                terms and conditions
              </a>
            </p>
          </div>
          <button className="bg-primary py-4 text-white rounded-lg text-lg">
            Submit Documents
          </button>
        </div>
      </form>
    </div>
  );
};

export default Verification;

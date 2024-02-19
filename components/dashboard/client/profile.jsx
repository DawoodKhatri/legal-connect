import React, { useContext, useState,useEffect } from "react";
import { HTTP_METHODS } from "@/constants/httpMethods";
import httpRequest from "@/utils/httpRequest";
import ServiceProviderCard from "@/components/dashboard/client/ServiceProviderCard";


const DashboardClientProfile = () => {

  const [serviceProviders, setServiceProviders] = useState([]);
  useEffect(() => {
    getVerifiedServiceProviders()
  }, []);

  const getVerifiedServiceProviders = async () => {
    const {success, message, data} = await httpRequest("/api/client/serviceProviders", HTTP_METHODS.GET);
    if (success) {
      setServiceProviders(data.serviceProviders);
    } else {
      alert(message);
    }
  }

  return <>
      <h1 className="text-center text-3xl py-4 md:text-4xl text-primary-navy font-semibold ">Verified Lawyers</h1>
      <div className="flex justify-center flex-col desktop:flex-row">
        {serviceProviders.map((data) =>  <ServiceProviderCard key={data["_id"]} serviceProvidersDetail={data} ></ServiceProviderCard>  )}
      </div>
  </>;
};

export default DashboardClientProfile;

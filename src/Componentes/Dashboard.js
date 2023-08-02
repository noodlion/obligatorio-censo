import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

const Dashboard = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("apiKey") === null) {
      navigate("/");
    }
  
  }, [])

  return <div><Logout/></div>;
};

export default Dashboard;

import React from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import AppointementsList from "../AppointementsList/AppointementsList";
import AppointmentScreen from "./AppointmentScreen";
import "./SupportRep.css";
import { useLocation } from "react-router-dom";

function SupportRep() {
  const location = useLocation();
  console.log(location.state);
  return (
    <div className="fullScreen">
      <NavBar />
      <div className="container">
        <AppointementsList branchId={location?.state?.branchId}/>
        {/* <AppointmentScreen /> */}
      </div>
      <Footer />
    </div>
  );
}

export default SupportRep;

// import { Button } from "bootstrap";
import React, { Component, useEffect, useState } from "react";
import Branch from "../Branch/Branch";
import Footer from "../Footer/Footer";
import NavBarOrgManager from "../NavBarOrgManager/NavBarOrgManager";
import "./OrgManager.css";
import useFetch from "../../useFetch";
import apiPath from "../../apiPath";
import NewBranchModal from "../NewBranchModal/NewBranchModal";
import { useLocation } from "react-router-dom";
import axios from "axios";
function OrgManager(props) {
  const location = useLocation();
  const usefetch = useFetch();
  const [branches, setBranches] = useState([]);
  getBranches();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow("");
  const handleSaveChanges = () => {
    handleClose();
  };

  async function getBranches() {
    let { data: brnches } = await axios.get(
      apiPath + `/Branch/Branches?orgId=${location.state.orgId}`
    );
    setBranches(brnches);
  }
  return (
    <div>
      <NavBarOrgManager show={show} setShow={setShow} />
      <div className="grid-container">
        {branches &&
          branches?.map((branch) => (
            <Branch
              updateBranches={getBranches}
              key={branch.id}
              data={branch}
            />
          ))}
      </div>
      <NewBranchModal
        show={show}
        orgId={location.state.orgId}
        setShow={setShow}
      />

      <Footer />
    </div>
  );
}

export default OrgManager;

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./Branch.css";
import BranchDetails from "../BranchDetails/BranchDetails";
import BranchWorkingHours from "../BranchWorkingHours/BranchWorkingHours";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
import apiPath from "../../apiPath";

function Branch(props) {
  const [branchId, setBranchId] = useState(props.data.id);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow("");
  const handleSaveChanges = () => {
    handleClose();
  };

  const removeBranch = async () => {
    if(window.confirm("Are you sure to remove Branch: "+props.data.name))
    try {
      let url = apiPath + "/Branch/RemoveBranch?branchId=" + branchId;
      const response = await axios.delete(url);
      props.updateBranches();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card style={{ width: "18rem" }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <DeleteForeverIcon
        onClick={removeBranch}
        className="deleteIcon"
        style={{ position: "relative", right: 0 }}
      ></DeleteForeverIcon>
      <Card.Body>
        <Card.Title>{props.data.name} </Card.Title>

        <Card.Text>
          <label>Name: {props.data.name}</label>
          <br />
          <label>Email: {props.data.email}</label>
          <br />
        </Card.Text>

        <div className="cardButtons">
          <Button
            className="branchBtns editInfo"
            variant="primary"
            onClick={() => setShow("infoModal")}
          >
            Informations
          </Button>

          <Button
            className="branchBtns editWorkHours"
            variant="primary"
            onClick={() => setShow("workHoursModal")}
          >
            Work Hours
          </Button>
        </div>
        <Modal className="BranchModal" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Branch Details</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modalBody">
            {show == "infoModal" ? (
              <BranchDetails
                data={props}
                branchId={props.data.id}
                saveCloseModal={handleSaveChanges}
                closeModal={handleClose}
                className="infoModal"
              />
            ) : null}

            {show == "workHoursModal" ? (
              <BranchWorkingHours
                id={props.data.id}
                className="workHoursModal"
                saveCloseModal={handleClose}
              />
            ) : null}
          </Modal.Body>
        </Modal>
      </Card.Body>
    </Card>
  );
}

export default Branch;


import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./NewBranchModal.css";
import NewBranchDetails from "../NewBranchDetails/NewBranchDetails";
import NewBranchWorkingHours from "../NewBranchWorkingHours/NewBranchWorkingHours";
// import ServiceModal from "../ServiceModal/ServiceModal";


function BranchModal(props) {
  const handleClose = () => props.setShow("");
  const handleSaveChanges = () => {
    handleClose();
    props.setShow("workHoursModal")
  };
  const [branchId,setBranchId] = useState('');

  return (
    <Modal className="BranchModal" show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Branch Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        {props.show == "infoModal" ? (
          <NewBranchDetails
            data={props}
            orgId={props.orgId}
            branchId={props.data && props.data.id}
            saveCloseModal={handleSaveChanges}
            closeModal={handleClose}
            className="infoModal"
            setBranchId={setBranchId}
          />
        ) : null}

        {props.show == "workHoursModal" ? (
          <NewBranchWorkingHours
            // id={props.data.id}
            className="workHoursModal"
            branchId={branchId}
            saveCloseModal={handleClose}
          />
        ) : null}
      </Modal.Body>
    </Modal>
  );
}

export default BranchModal;

import React, { Component, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Form from "react-bootstrap/Form";
import "./NewBranchDetails.css";
import axios from "axios";
import apiPath from "../../apiPath";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ServiceModal from "../ServiceModal/ServiceModal";
import FormControl from "@mui/material/FormControl";

function NewBranchDetails(props) {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [branchId, setBranchId] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {
    if (services && address && phone && name && email) {
      try {
        let url =
          apiPath +
          `/Branch/AddNewBranch?` +
          `orgId=${props.orgId}` +
          `&name=${name}` +
          `&email=${email}` +
          `&phone=${phone}` +
          `&address=${address}`+
          `&password=${password}`;
        let response = await axios.post(url, services);
        console.log(response);
        props.setBranchId(response?.data?.id);
        props.saveCloseModal();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <FormControl onSubmit={handleSubmit} className="containerr">
      <TextField
        className="textInput"
        margin="normal"
        required
        fullWidth
        name="name"
        size="small"
        label="Name"
        id="name"
        autoComplete="current-password"
        defaultValue={name}
        autoFocus
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <TextField
        className="textInput"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        size="small"

        autoComplete="email"
        defaultValue={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
       <TextField
        className="textInput"
        margin="normal"
        required
        fullWidth
        id="password"
        size="small"

        label="Password"
        name="password"
        autoComplete="password"
        defaultValue={address}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <TextField
        className="textInput"
        margin="normal"
        required
        fullWidth
        id="address"
        size="small"

        label="Address"
        name="address"
        autoComplete="address"
        defaultValue={address}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <TextField
        className="textInput"
        margin="normal"
        size="small"
        required
        fullWidth
        id="Phone"
        label="Phone"
        name="Phone"
        autoComplete="Phone"
        defaultValue={phone}
        onChange={(e) => {
          setPhone(e.target.value);
        }}
      />

      <Modal.Footer>
        
      <ServiceModal
        className="serviceModal"
        services={services}
        setServices={setServices}
      />
        <Button variant="secondary" onClick={props.closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} branchId={branchId}>
          Next
        </Button>
      </Modal.Footer>
    </FormControl>
  );
}

export default NewBranchDetails;

import React, { Component, useState } from "react";
import Form from "react-bootstrap/Form";
import "./NewBranchWorkingHours.css";
import TimeInputs from "./NewTimeInputs";
import useFetch from "../../useFetch";
import apiPath from "../../apiPath";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import moment from "moment";

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function NewBranchWorkingHours(props) {
  const [dataToUpdate, setDataToUpdate] = useState([]);
  const [workHours, setWorkHours] = useState([]);

  const handleSubmit = async (e) => {
    console.log(workHours);

    //check if all inputs are filled
    if (workHours.length == 7) {
      workHours.forEach(async (wh, index) => {
        if (!!wh.dayNum) {
          let workFrom = wh.workFrom;
          let workTo = wh.workTo;
          let breakFrom = wh.breakFrom;
          let breakTo = wh.breakTo;
          let dayNum = wh.dayNum;
          let isDayOff = wh.isDayOff;
          var wf = workFrom
            ? new moment("1900-01-01T" + workFrom).format("MM-D-YYYY HH:mm")
            : "";
          var wt = workTo
            ? new moment("1900-01-01T" + workTo).format("MM-D-YYYY HH:mm")
            : "";
          var bf = breakFrom
            ? new moment("1900-01-01T" + breakFrom).format("MM-D-YYYY HH:mm")
            : "";
          var bt = breakTo
            ? new moment("1900-01-01T" + breakTo).format("MM-D-YYYY HH:mm")
            : "";

          var breakParams =
            bf.length > 0 && bt.length > 0
              ? `&breakFrom=${bf}` + `&breakTo=${bt}`
              : `&breakFrom=1900-01-01 00:00:00.000` +
                `&breakTo=1900-01-01 00:00:00.000`;

          var workParams =
            bf.length > 0 && bt.length > 0
              ? `&workFrom=${wf}` + `&workTo=${wt}`
              : `&workFrom=1900-01-01 00:00:00.000` +
                `&workTo=1900-01-01 00:00:00.000`;
          var url =
            `${apiPath}/WorkHours/AddWorkHours?` +
            `BranchId=${props.branchId}` +
            `&dayWeek=${dayNum}` +
            workParams +
            `&isDayOff=${isDayOff}` +
            `&dayWeek=${dayNum}` +
            breakParams;
          console.log(url);
          try {
            const response = await axios.post(url);
            console.log(response);
          } catch (error) {
            console.log(error);
          }
        }
      });
      alert("Branch added successfully");
      props.saveCloseModal();
    } else {
      alert("Please fill all the workHours for the whole week");
    }
    //insert work hours
  };

  return (
    <Form>
      {days &&
        days.map((wh, index) => {
          return (
            <TimeInputs
              title={days[index]}
              data={wh}
              dayNum={index}
              workHours={workHours}
              setWorkHours={setWorkHours}
            />
          );
        })}
      <Modal.Footer>
        <Button variant="secondary" onClick={props.closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Form>
  );
}
export default NewBranchWorkingHours;

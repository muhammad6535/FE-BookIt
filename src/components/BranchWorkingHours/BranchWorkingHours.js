import React, { Component, useState } from "react";
import Form from "react-bootstrap/Form";
import "./BranchWorkingHours.css";
import TimeInputs from "./TimeInputs";
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

function BranchWorkingHours(props) {
  const [dataToUpdate, setDataToUpdate] = useState([]);
  let { data: workHours } = useFetch(
    apiPath + `/WorkHours/WorkHours?branchId=` + props.id
  );

  const handleSubmit = (e) => {
    dataToUpdate.forEach(async (branchDetails, index) => {
      if (!!branchDetails.dayNum) {
        let workFrom = branchDetails.workFrom;
        let workTo = branchDetails.workTo;
        let breakFrom = branchDetails.breakFrom;
        let breakTo = branchDetails.breakTo;
        let dayNum = branchDetails.dayNum;
        let isDayOff = branchDetails.isDayOff;
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
        var url =
          `${apiPath}/WorkHours/UpdateWorkHours?` +
          `BranchId=${props.id}` +
          `&dayWeek=${dayNum}` +
          `&workFrom=${wf}` +
          `&workTo=${wt}` +
          `&isDayOff=${isDayOff}` +
          breakParams;
        try {
          const response = await axios.put(url);
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }
    });

    props.saveCloseModal();
  };

  return (
    <Form>
      {workHours &&
        workHours.map((wh, index) => {
          return (
            <TimeInputs
              title={days[index]}
              data={wh}
              dayNum={wh?.o?.day}
              branchId={props.id}
              setDataToUpdate={setDataToUpdate}
              dataToUpdate={dataToUpdate}
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
export default BranchWorkingHours;

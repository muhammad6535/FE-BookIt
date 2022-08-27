import React, { Component, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Form from "react-bootstrap/Form";

import "./NewBranchWorkingHours.css";

function TimeInputs(props) {
  const [checked, setChecked] = useState(false);
  const [workFrom, setWrokFrom] = useState();
  const [workTo, setWrokTo] = useState();
  const [breakFrom, setBreakFrom] = useState();
  const [breakTo, setBreakTo] = useState();
  const [isDayOff, setIsDayOff] = useState(false);
  const [branchId, setBranchId] = useState();
  const [dayNum, setDayNum] = useState(props.dayNum + 1);
  const [newData, setNewData] = useState({});
  const [object, setObject] = useState();

  useEffect(() => {

    let newObj = {
      workFrom: workFrom,
      workTo: workTo,
      breakFrom: breakFrom,
      breakTo: breakTo,
      isDayOff: isDayOff,
      dayNum: dayNum,
    };
    // console.log(isDayOff)

    let exists = props.workHours.find((obj) => {
      return obj?.dayNum == dayNum;
    });
    if (exists) {
      props.setWorkHours(
        props.workHours.map((obj) => {
          if (obj?.dayNum == newObj?.dayNum) {
            return newObj;
          }
          return obj;
        })
      );
    } else {
      props.setWorkHours([...props.workHours, newObj]);
    }
  }, [workFrom, workTo, breakFrom, breakTo, dayNum, isDayOff]);

  
  return (
    <div className="timeInputs">
      <label>{props.title}: </label>
      <label className="checkBox">
        <input
          type="checkbox"
          onClick={() => {
            setChecked(!checked);
            setIsDayOff(!isDayOff);
          }}
          defaultChecked={isDayOff}
        />{" "}
        Is Day Off
      </label>

      <div className="workingHours">
        <TextField
          margin="normal"
          required
          fullWidth
          name="from"
          label="Working Hours: From"
          id="from"
          autoComplete="from"
          defaultValue={workFrom}
          disabled={checked}
          onChange={(e) => {
            setWrokFrom(e.target.value);
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="to"
          label="Working Hours: To"
          id="to"
          autoComplete="to"
          defaultValue={workTo}
          disabled={checked}
          onChange={(e) => {
            setWrokTo(e.target.value);
          }}
        />
      </div>
      <div className="workingHours">
        <TextField
          margin="normal"
          required
          fullWidth
          name="from"
          label="Break: From"
          id="from"
          autoComplete="from"
          defaultValue={breakFrom}
          disabled={checked}
          onChange={(e) => {
            setBreakFrom(e.target.value);
          }}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          name="to"
          label="Break: To"
          id="to"
          autoComplete="to"
          defaultValue={breakTo}
          disabled={checked}
          onChange={(e) => {
            setBreakTo(e.target.value);
          }}
        />
      </div>
      <div className="bottumBorder"></div>
    </div>
  );
}

export default TimeInputs;

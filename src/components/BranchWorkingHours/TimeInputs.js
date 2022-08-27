import React, { Component, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import "./BranchWorkingHours.css";

function TimeInputs(props) {
  const [checked, setChecked] = useState(props.data.o.isDayOff);
  const [workFrom, setWrokFrom] = useState(props.data.workFrom);
  const [workTo, setWrokTo] = useState(props.data.workTo);
  const [breakFrom, setBreakFrom] = useState(props.data.breakFrom);
  const [breakTo, setBreakTo] = useState(props.data.breakTo);
  const [isDayOff, setIsDayOff] = useState(props.data.o.isDayOff);
  const [branchId, setBranchId] = useState(props.branchId);
  const [dayNum, setDayNum] = useState(props.dayNum);
  const [newData, setNewData] = useState({});

  const handleClick = (props) => {
    setChecked(!checked);
    setIsDayOff(!checked);
  };
  useEffect(() => {
    setNewData({
      id: dayNum,
      workFrom: workFrom,
      workTo: workTo,
      breakFrom: breakFrom,
      breakTo: breakTo,
      isDayOff: isDayOff,
      branchId: branchId,
      dayNum: props.dayNum,
    });
  }, [workFrom, workTo, breakFrom, breakTo, isDayOff]);

  useEffect(() => {
    if(props.dataToUpdate.some(branch=>branch.dayNum ==props.dayNum)){
      props.setDataToUpdate(props.dataToUpdate.map(newBranchData=>{
        if(newBranchData.dayNum==newData.dayNum){
          return newData
        }else{
          return newBranchData
        }
      }))

    }else{
      props.setDataToUpdate([...props.dataToUpdate,newData])
    }
  
  }, [newData])
  
  return (
    <div className="timeInputs">
      
      <label>{props.title}: </label>
      <label className="checkBox">
        <input 
          type="checkbox"
          onClick={handleClick}
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

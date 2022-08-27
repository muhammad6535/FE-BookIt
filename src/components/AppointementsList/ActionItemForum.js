import React, { useState } from "react";
import "./AppointementsList.css";
import useFetch from "../../useFetch";
import apiPath from "../../apiPath";
import axios from "axios";
import ActionItemList from "./ActionItemList";

function ActionItemForum(props) {
  const [branchId, setBranchId] = useState(props.branchId);

  const [state, setState] = useState([]);
  const handleChange = (event) => {
    event.persist();
    setState((prevState) => ({
      actionItem:
        event.target.name === "actionItem"
          ? event.target.value
          : prevState.actionItem,
      dueDate:
        event.target.name === "dueDate"
          ? event.target.value
          : prevState.dueDate,
    }));
  };

  const deleteActionItemFromState = (index) => {
    const ActionItemsList = [...state.ActionItemsList];
    ActionItemsList.splice(index, 1);
    setState({ ActionItemsList });
  };

  const addActionItemToState = (dueDate) => {
    console.log(state)
    parseAppointments();
  };

  function parseAppointments(bId,dueDate) {
    const url =
      apiPath +
      `/Appointment/Appointments?BranchId=${bId || branchId}` +
       `&date=${dueDate || state.dueDate}` ;
    const appointments = axios.get(url).then((res) => {
      setState(res.data);
    });
    
  }

  const handleSubmission = (event) => {
    event.preventDefault();
    addActionItemToState(state.actionItem, state.dueDate);
  };

  return (
    <>
      <div className="formList">
        <form onSubmit={handleSubmission}>
          <div className="form-group"></div>
          <div className="form-group">
            <label for="dueDate">Due Date:</label>
            <input
              type="Date"
              className="form-control"
              id="dueDate"
              name="dueDate"
              onChange={handleChange}
              value={state.dueDate}
              required
            />
          </div>
          <button type="submit" className="btn btn-default addBtn">
            Search
          </button>
        </form>
      </div>
      <ActionItemList
        actionItemsList={state}
        deleteActionItemFromState={deleteActionItemFromState}
        updateTable={parseAppointments}
        branchId={branchId}
        // date={state.dueDate}
      />
    </>
  );
}

export default ActionItemForum;

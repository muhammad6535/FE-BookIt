import React from "react";
import "./AppointementsList.css";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import AppointmentScreen from "../SupportRep/AppointmentScreen";
import axios from "axios";
import apiPath from "../../apiPath";

const ActionItemList = (props) => {
  const emptyList = (length) => {
    if (length === 0) {
      return (
        <tr style={{ "text-align": "center" }}>
          <td colSpan="3">No Appointments</td>
        </tr>
      );
    }
  };

  const deleteActionItemFromState = (actionItem) => async (e) => {
    console.log(actionItem);
    if (
      window.confirm(
        "Are you sure to hide appointment num: " + actionItem.id
      ) == true
    )
      try {
        const response = await axios.delete(
          apiPath + "/Appointment/RemoveAppointment?id=" + actionItem.id
        );
        props.updateTable(props.branchId, actionItem.date);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <>
      <div className="container tableList">
        <table className="table">
          <thead>
            <tr>
              <th>Appointment Num</th>
              <th>Customer Name</th>
              <th>Service Type</th>
              <th>Time</th>
              <th> Next </th>
            </tr>
          </thead>
          <tbody>
            {emptyList(props.actionItemsList && props.actionItemsList.length)}
            {!!props.actionItemsList.length &&
              props.actionItemsList.map((actionItem, i) => (
                <tr key={i + 1}>
                  <td>{actionItem.id}</td>
                  <td>{actionItem.customerName}</td>
                  <td>{actionItem.serviceId}</td>
                  <td>{actionItem.date.split("T")[1]}</td>

                  <td>
                    {/* <button
                  type="button"
                  className="btn btn-danger"
                  onClick={deleteActionItemFromState(i)}
                >
                  
                  <span aria-hidden="true">&times;</span>
                </button> */}
                    <CheckCircleSharpIcon
                      style={{ color: "green" }}
                      type="button"
                      onClick={deleteActionItemFromState(actionItem)}
                    ></CheckCircleSharpIcon>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <AppointmentScreen
        appointment={props.actionItemsList.length && props.actionItemsList[0]}
      />
    </>
  );
};

export default ActionItemList;

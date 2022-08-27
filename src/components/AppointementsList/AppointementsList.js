import React, { useState } from "react";
import "./AppointementsList.css";
import useFetch from "../../useFetch";
import apiPath from "../../apiPath";
import ActionItemForum from "./ActionItemForum";
import ActionItemList from "./ActionItemList";

const AppointementsList = (props) => {
  
  return (
    <div>
      <ActionItemForum branchId = {props.branchId}/>
    </div>
  );
};

export default AppointementsList;

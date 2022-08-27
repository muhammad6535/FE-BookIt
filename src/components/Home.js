import React from "react";
import SignIn from "./SignInComponent/SignIn";
import OrgManager from "./OrgManager/OrgManager";
import SupportRep from "./SupportRep/SupportRep";
import SignUp from "./SignUpComponent/SignUp";

import "bootstrap/dist/css/bootstrap.min.css";


import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const Home = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<SignIn />}></Route>
        <Route path="/OrgManager" element={<OrgManager />}></Route>
        <Route path="/SupportRep" element={<SupportRep />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>

      </Routes>
    </Router>
  );
};

export default Home;

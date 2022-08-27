import React from "react";
import { MDBFooter, MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";
import "./Footer.css";

export default function App() {
  return (
    <div className="footerStyle">
      <MDBFooter
        className="text-center text-white"
        style={{ backgroundColor: "#0a4275" }}
      >
        <MDBContainer className="p-4 pb-0">
          <section className="">
            <p className="d-flex justify-content-center align-items-center">
              <span className="me-3">Manage Your Appointements Easly</span>
            </p>
          </section>
        </MDBContainer>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2022 Copyright:
          <a className="text-white" href="#">
            Book-It.com
          </a>
        </div>
      </MDBFooter>
    </div>
  );
}

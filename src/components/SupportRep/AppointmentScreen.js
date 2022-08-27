import "./AppointmentScreen.css";

function AppointmentScreen(props) {
  return (
    <>
      <div className="reminder">
        <div className="inner">
          <div>
            <text style={{ fontSize: 22, color: "#5CFF5C", fontStyle: "bold" }}>
              Current Appointment{" "}
            </text>{" "}
            <br />
            <text style={{ color: "white", fontStyle: "bold" }}>
              {" "}
              Name: {props.appointment && props.appointment.customerName}{" "}
            </text>
            <br />
            <text style={{ color: "white", fontStyle: "bold" }}>
              {" "}
              Time: {props.appointment && props.appointment.date.split("T")[1]}{" "}
            </text>
            <br />
            <text style={{ color: "white", fontStyle: "bold" }}>
              Service: {props.appointment && props.appointment.serviceId}{" "}
            </text>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}

export default AppointmentScreen;

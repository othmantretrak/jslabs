import { useReducer, useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const TrafficLight = (props) => {
  const [color, setColor] = useState("red");
  const [socketStatus, setSocketStatus] = useState("");
  // const [open, setOpen] = useState("");
  console.log(
    "🚀 ~ file: trafficlight.jsx:7 ~ TrafficLight ~ socketStatus:",
    socketStatus
  );
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return; // React 18 Strictmode runs useEffects twice in development`
    serverConnect();
    effectRan.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const serverConnect = () => {
    try {
      // connect to server locally
      const socket = io.connect("localhost:5000", {
        forceNew: true,
        transports: ["websocket"],
        autoConnect: true,
        reconnection: false,
        timeout: 5000,
      });

      //console.log("check 1", socket.connected);
      setSocketStatus("connecting...");

      socket.emit("join", { room: props.street }, (err) => {});
      socket.on("turnLampOn", (data) => handleTurnLampOn(data, socket));
    } catch (err) {
      console.log(err);
      //setState({ msg: "some other problem occurred" });
    }
  };
  // lamp handler code, lamp data from server
  const handleTurnLampOn = async (lampData, socket) => {
    socket.disconnect(); // don't need server anymore once we have data
    setSocketStatus("disconnected");

    while (true) {
      // loop until browser closes
      // wait on current colour, then set next color
      await waitSomeSeconds(lampData.red, "green");
      await waitSomeSeconds(lampData.green, "yellow");
      await waitSomeSeconds(lampData.yellow, "red");
    }
  };

  const waitSomeSeconds = (waitTime, nextColorToIlluminate) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setColor(nextColorToIlluminate); // update state variable
        resolve();
      }, waitTime);
    });
  };

  const getStateColor = (c) => (color === c ? color : "white");
  return (
    <div className="container">
      <h6
        style={{ textAlign: "center", fontName: "Helvetica", fontSize: "16px" }}
      >
        {socketStatus}
      </h6>
      <div className="traffic-lights shape">
        <div
          className="light red"
          style={{ backgroundColor: getStateColor("red"), margin: ".5rem" }}
        />
        <div
          className="light yellow"
          style={{ backgroundColor: getStateColor("yellow"), margin: ".5rem" }}
        />
        <div
          className="light green"
          style={{ backgroundColor: getStateColor("green"), margin: ".5rem" }}
        />
        <div
          style={{ textAlign: "center", color: "white", fontName: "Helvetica" }}
        >
          {props.street}
        </div>
      </div>
    </div>
  );
};
export default TrafficLight;

import React from "react";
import TrafficLight from "./trafficlight";

function Street() {
  return (
    <div className="wrapper">
      <h2 className="title">Lab 16</h2>
      <div className="flex-container">
        <TrafficLight street="Farah" />
        <TrafficLight street="Teima" />
        <TrafficLight street="Info3139" />
      </div>
    </div>
  );
}

export default Street;

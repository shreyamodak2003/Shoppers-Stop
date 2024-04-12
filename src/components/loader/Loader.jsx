import React from "react";
import "./Loader.css"

export default function Loader() {
  return (
    <div className="loader-main">
      <h1 className="text-center">loading...</h1>
      <img className="loader-img" width={"250px"} src="https://media.tenor.com/GNNzkglY_LYAAAAi/shopping-happy.gif" alt="loader" />
    </div>
  );
}
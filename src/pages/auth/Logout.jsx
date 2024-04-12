import React, { useContext } from "react";
import "./Auth.css";
import { authContext } from "../../context/AuthContext";

export default function Logout() {
  const { isAuth, handleLogout } = useContext(authContext);

  const data = 
  isAuth === "true"? JSON.parse(localStorage.getItem("shoppify-auth")): null

  return (
    <div className="container mt-3 mb-3">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="logout-img col-md-4">
            <img src="https://i.pinimg.com/originals/59/80/88/5980881833c23caf5dd3a96d09651665.gif" alt="logout"/>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">{data?.username}</h2>
              <p className="card-text">{data?.useremail}</p>
              <button onClick={handleLogout} className="btn btn-danger">
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
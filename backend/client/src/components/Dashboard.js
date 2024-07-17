import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
        <Navbar/>
      <div className="dashboard-content">
        <h1 className="dashboard-heading">Welcome to the Dashboard</h1>
        <ul className="dashboard-list">
          <li>
            <Link className="dashboard-link" to="/view-profile">View Profile</Link>
          </li>
          <li>
            <Link className="dashboard-link" to="/update-profile">Update Profile</Link>
          </li>
          <li>
            <Link className="dashboard-link" to="/generate-itinerary">Generate Itinerary</Link>
          </li>
          <li>
            <Link className="dashboard-link" to="/show-itineraries">Show Previous Itineraries</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

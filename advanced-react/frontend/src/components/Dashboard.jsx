import React from "react";
// import withAuth from "../utils/withAuth";
// import withDarkMode from "../utils/withDarkMode";
// import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  // const { logout } = useAuth();
  const user = { name: "Ekalavya" };
  return (
    <div className="dashboard">
      <h3 style={{ marginBottom: "5px" }}>Dashboard Overview</h3>
      <p>Total Employees: 120</p>
      <p>Total Departments: 8</p>
      <p>Reports Generated: 25</p>
      {/* <Outlet /> */}
      <Outlet context={{ user }} />
      {/* <button type="button" onClick={logout}>
        Logout
      </button> */}
    </div>
  );
};

// const AuthDashboard = withDarkMode(withAuth(Dashboard));
// export default AuthDashboard;

export default Dashboard;

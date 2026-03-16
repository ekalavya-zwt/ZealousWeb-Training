import { NavLink, Outlet } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import "../styles/DashboardLayout.css";

function DashboardLayout() {
  const currentUser = {
    name: "Admin",
    role: "Manager",
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <aside style={{ width: "200px", background: "#eee", padding: "20px" }}>
        <h3>Dashboard</h3>

        <nav style={{ marginTop: "10px" }}>
          <NavLink
            to="employees"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Employees
          </NavLink>
          <br />

          <NavLink
            to="departments"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Departments
          </NavLink>
          <br />

          <NavLink
            to="reports"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Reports
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {/* Header */}
        <header>
          <h2>Welcome {currentUser.name}</h2>
        </header>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* Child Routes */}
        <Outlet context={{ currentUser }} />
      </div>
    </div>
  );
}

export default DashboardLayout;

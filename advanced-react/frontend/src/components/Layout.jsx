import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("Path:", location.pathname);
  }, [location]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ marginBottom: "10px" }}>My Website</h1>
      <nav style={{ cursor: "pointer" }}>
        <a onClick={() => navigate("/", { replace: true })}>Home</a>
        <a onClick={() => navigate("/about", { replace: true })}>About</a>
        <a onClick={() => navigate("/projects", { replace: true })}>Projects</a>
        <a onClick={() => navigate("/contact", { replace: true })}>Contact</a>
      </nav>
      <main style={{ textAlign: "left", marginTop: "10px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useToast from "../hooks/useToast";
import { Box, Typography, Button } from "@mui/material";

const Dashboard = () => {
  const { logout } = useAuth();
  const { addToast } = useToast();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    addToast("Logout Successful", "success");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          p: 1,
        }}
      >
        <Typography variant="h4">Welcome to the Dashboard</Typography>

        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          sx={{ mt: 1 }}
        >
          Logout
        </Button>
      </Box>
    </>
  );
};

export default Dashboard;

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Typography,
  Box,
  Divider,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";

const drawerWidth = 240;

const Sidebar = () => {
  const menuItems = [
    { text: "Dashboard", path: "/", icon: <DashboardIcon /> },
    { text: "Employees", path: "/employees", icon: <PeopleIcon /> },
    { text: "Report", path: "/report", icon: <BarChartIcon /> },
  ];

  const { logout, user } = useAuth();
  const { mode, toggleTheme } = useTheme();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "background.paper",
        },
      }}
    >
      <Toolbar sx={{ px: 3 }}>
        <Typography variant="h6" fontWeight={700}>
          Employee Panel
        </Typography>
      </Toolbar>

      <Box sx={{ px: 3, pb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Logged in as
        </Typography>
        <Typography variant="subtitle2" fontWeight={600}>
          {user?.email}
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.text}
                component={NavLink}
                to={item.path}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  my: 0.5,
                  "&.active": {
                    backgroundColor: "action.selected",
                    borderLeft: "4px solid",
                    borderColor: "primary.main",
                    "& .MuiListItemIcon-root": {
                      color: "primary.main",
                    },
                    "& .MuiListItemText-primary": {
                      fontWeight: 600,
                    },
                  },
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ ml: 2 }} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Box>

      <Box sx={{ p: 2 }}>
        <FormControlLabel
          control={<Switch checked={mode === "dark"} onChange={toggleTheme} />}
          label="Dark Mode"
        />
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          color="error"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

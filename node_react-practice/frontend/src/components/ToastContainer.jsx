import React from "react";
import useToast from "../hooks/useToast";
import { Snackbar, Alert, Slide, Stack } from "@mui/material";

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <Stack
      spacing={1}
      sx={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 1400,
        width: 350,
      }}
    >
      {toasts.map((toast) => (
        <Snackbar
          key={toast.id}
          open
          TransitionComponent={SlideTransition}
          transitionDuration={{ enter: 300, exit: 200 }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            severity={toast.type}
            variant="filled"
            onClick={() => removeToast(toast.id)}
            sx={{ color: "white", width: "100%" }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </Stack>
  );
};

export default ToastContainer;

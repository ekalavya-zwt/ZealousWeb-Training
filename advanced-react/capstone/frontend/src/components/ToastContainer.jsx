import React from "react";
import useToastStore from "../stores/toastStore";
import { Snackbar, Alert, Stack, Slide } from "@mui/material";

const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
  }

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
            onClose={() => removeToast(toast.id)}
            sx={{ width: "100%", color: "white" }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </Stack>
  );
};

export default ToastContainer;

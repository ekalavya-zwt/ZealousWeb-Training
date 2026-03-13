import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginEmployee } from "../mutations/useLoginEmployee";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Paper,
  Divider,
} from "@mui/material";

const Login = () => {
  const emptyForm = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const [inputs, setInputs] = useState(emptyForm);
  const [formError, setFormError] = useState({});

  const { mutate, isPending, error, reset } = useLoginEmployee();

  const handleInputs = (event) => {
    const { name, value } = event.target;

    setInputs((prev) => ({ ...prev, [name]: value }));

    if (formError[name]) {
      setFormError((prev) => ({ ...prev, [name]: "" }));
    }

    reset();
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const newErrors = {};

    if (inputs.email.trim() === "") {
      newErrors.email = "Email cannot remain empty";
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!inputs.password) {
      newErrors.password = "Password is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setFormError(newErrors);
      return;
    }

    mutate(inputs, {
      onSuccess: () => {
        navigate("/", { replace: true });
      },
    });
    setFormError({});
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          maxWidth: 500,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "95vh",
          mx: "auto",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: 400,
            p: 4,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              <Typography fontWeight={600}>{error.message}</Typography>
            </Alert>
          )}

          <Typography variant="h4" gutterBottom align="center">
            Login
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <TextField
            label="Email"
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleInputs}
            fullWidth
            margin="normal"
            autoFocus
          />
          {formError.email && (
            <Alert severity="error" variant="standard">
              {formError.email}
            </Alert>
          )}

          <TextField
            label="Password"
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleInputs}
            fullWidth
            margin="normal"
          />
          {formError.password && (
            <Alert severity="error" variant="standard">
              {formError.password}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </Paper>
      </Box>
    </>
  );
};

export default Login;

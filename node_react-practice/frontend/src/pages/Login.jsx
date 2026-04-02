import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginEmployee } from "../mutations/useLoginEmployee";
import loginSchema from "../schema/loginSchema";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Alert,
  TextField,
  Button,
} from "@mui/material";

const Login = () => {
  const navigate = useNavigate();

  const {
    mutate: loginMutation,
    isPending: isLoggingIn,
    error: loginError,
    reset: resetMutation,
  } = useLoginEmployee();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    resetMutation();
    loginMutation(data, {
      onSuccess: () => {
        navigate("/", { replace: true });
      },
    });
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
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
          {loginError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              <Typography>{loginError.message}</Typography>
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
            margin="normal"
            fullWidth
            autoFocus
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            margin="normal"
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            disabled={isLoggingIn}
            fullWidth
          >
            {isLoggingIn ? "Submitting..." : "Submit"}
          </Button>
        </Paper>
      </Box>
    </>
  );
};

export default Login;

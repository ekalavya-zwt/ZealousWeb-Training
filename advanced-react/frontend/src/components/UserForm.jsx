import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../schemas/UserSchema";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 500, mx: "auto", mt: 2 }}
    >
      <Typography variant="h5" fontWeight={600} gutterBottom>
        User Form
      </Typography>

      <TextField
        label="Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
        margin="normal"
        autoFocus
      />

      <TextField
        label="Email"
        type="email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Password"
        type="password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Confirm Password"
        type="password"
        {...register("confirmPassword")}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        fullWidth
        margin="normal"
      />

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
}

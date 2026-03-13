import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDepartments } from "../queries/UseDepartments";
import { useCreateEmployee } from "../mutations/useCreateEmployee";
import { formatCurrency, formatDate } from "../utils/formatters";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  Stack,
  Divider,
  Alert,
  CircularProgress,
  MenuItem,
} from "@mui/material";

const Row = ({ label, value }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      gap: 2,
    }}
  >
    <Typography color="text.secondary">{label}</Typography>
    <Typography fontWeight={500}>{value}</Typography>
  </Box>
);

const CreateEmployee = () => {
  const navigate = useNavigate();

  const emptyForm = {
    first_name: "",
    last_name: "",
    email: "",
    hire_date: "",
    salary: "",
    dept_id: "",
    state: "",
  };

  const [inputs, setInputs] = useState(emptyForm);
  const [step, setStep] = useState(1);
  const [formError, setFormError] = useState({});

  const { data, isLoading, error } = useDepartments();
  const {
    mutate: createEmployeeMutation,
    isPending: isCreating,
    error: createError,
  } = useCreateEmployee();

  const handleInputs = (event) => {
    const { name, value } = event.target;

    setInputs((prev) => ({ ...prev, [name]: value }));

    if (formError[name]) {
      setFormError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCreateEmployee = (event) => {
    event.preventDefault();
    createEmployeeMutation(inputs, {
      onSuccess: () => {
        navigate("/employees", { replace: true });
      },
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (step === 1) {
      if (inputs.first_name.trim() === "") {
        newErrors.first_name = "First name is required";
      }
      if (inputs.last_name.trim() === "") {
        newErrors.last_name = "Last name is required";
      }
      if (inputs.email.trim() === "") {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
        newErrors.email = "Invalid email format";
      }
    }

    if (step === 2) {
      if (!inputs.dept_id) {
        newErrors.dept_id = "Department is required";
      }
      if (!inputs.salary) {
        newErrors.salary = "Salary is required";
      } else if (Number(inputs.salary) <= 0) {
        newErrors.salary = "Salary must be greater than 0";
      }
      if (!inputs.hire_date) {
        newErrors.hire_date = "Hire date is required";
      } else if (inputDate > today) {
        newErrors.hire_date = "Hire date cannot be in the future";
      }
      if (inputs.state.trim() === "") {
        newErrors.state = "Status is required";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setFormError(newErrors);
      return;
    }

    nextStep();
  };

  const today = new Date();
  const inputDate = new Date(inputs.hire_date);

  const selectedDept = data?.find(
    (department) => department.dept_id === Number(inputs.dept_id),
  );

  const nextStep = () => {
    setFormError({});
    setStep((prevStep) => prevStep + 1);
  };
  const prevStep = () => {
    setFormError({});
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  if (isLoading) {
    return (
      <Typography align="center" fontWeight={600}>
        Loading Departments...
        <CircularProgress sx={{ display: "block", mx: "auto", mt: 2 }} />
      </Typography>
    );
  }
  if (error) {
    return (
      <Alert severity="error">
        <Typography fontWeight={600}>{error.message}</Typography>
      </Alert>
    );
  }

  return (
    <>
      {createError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography fontWeight={600}>{createError.message}</Typography>
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleCreateEmployee}
        sx={{ maxWidth: 500, mx: "auto" }}
      >
        {step === 1 && (
          <>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Step 1: Personal Info
            </Typography>

            <TextField
              label="First Name"
              name="first_name"
              value={inputs.first_name}
              onChange={handleInputs}
              fullWidth
              margin="normal"
              autoFocus
            />
            {formError.first_name && (
              <Alert severity="error" variant="standard">
                {formError.first_name}
              </Alert>
            )}

            <TextField
              label="Last Name"
              name="last_name"
              value={inputs.last_name}
              onChange={handleInputs}
              fullWidth
              margin="normal"
            />
            {formError.last_name && (
              <Alert severity="error" variant="standard">
                {formError.last_name}
              </Alert>
            )}

            <TextField
              label="Email"
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleInputs}
              fullWidth
              margin="normal"
            />
            {formError.email && (
              <Alert severity="error" variant="standard">
                {formError.email}
              </Alert>
            )}

            <Box
              sx={{
                display: "flex",
                gap: 1,
                mt: 2,
              }}
            >
              {step > 1 && (
                <Button variant="contained" sx={{ flex: 1 }} onClick={prevStep}>
                  Back
                </Button>
              )}

              <Button
                variant="contained"
                sx={{ flex: 1 }}
                onClick={validateForm}
                disabled={isCreating}
              >
                Next
              </Button>
            </Box>
          </>
        )}

        {step === 2 && (
          <>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Step 2: Employment Info
            </Typography>

            <TextField
              label="Hire Date"
              type="date"
              name="hire_date"
              value={inputs.hire_date}
              onChange={handleInputs}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              autoFocus
            />
            {formError.hire_date && (
              <Alert severity="error" variant="standard">
                {formError.hire_date}
              </Alert>
            )}

            <TextField
              label="Salary"
              type="number"
              name="salary"
              value={inputs.salary}
              onChange={handleInputs}
              fullWidth
              margin="normal"
            />
            {formError.salary && (
              <Alert severity="error" variant="standard">
                {formError.salary}
              </Alert>
            )}

            <TextField
              select
              label="Department"
              name="dept_id"
              value={inputs.dept_id}
              onChange={handleInputs}
              fullWidth
              margin="normal"
              disabled={isLoading}
            >
              {data?.map((department) => (
                <MenuItem key={department.dept_id} value={department.dept_id}>
                  {department.dept_name}
                </MenuItem>
              ))}
            </TextField>
            {formError.dept_id && (
              <Alert severity="error" variant="standard">
                {formError.dept_id}
              </Alert>
            )}

            <TextField
              label="Status"
              name="state"
              value={inputs.state}
              onChange={handleInputs}
              fullWidth
              margin="normal"
            />
            {formError.state && (
              <Alert severity="error" variant="standard">
                {formError.state}
              </Alert>
            )}

            <Box
              sx={{
                display: "flex",
                gap: 1,
                mt: 2,
              }}
            >
              <Button variant="contained" sx={{ flex: 1 }} onClick={prevStep}>
                Back
              </Button>
              <Button
                variant="contained"
                sx={{ flex: 1 }}
                onClick={validateForm}
                disabled={isCreating}
              >
                Next
              </Button>
            </Box>
          </>
        )}

        {step === 3 && (
          <>
            <Card
              sx={{
                maxWidth: 600,
                mx: "auto",
                p: 3,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Step 3: Review & Submit
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={1.5}>
                <Row
                  label="Full Name"
                  value={`${inputs.first_name} ${inputs.last_name}`}
                />
                <Row label="Email" value={inputs.email} />
                <Row label="Salary" value={formatCurrency(inputs.salary)} />
                <Row label="Hire Date" value={formatDate(inputs.hire_date)} />
                <Row
                  label="Department"
                  value={selectedDept ? selectedDept.dept_name : ""}
                />
                <Row label="Status" value={inputs.state} />
              </Stack>
            </Card>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                mt: 2,
              }}
            >
              <Button variant="contained" sx={{ flex: 1 }} onClick={prevStep}>
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ flex: 1 }}
                disabled={isCreating}
              >
                {isCreating ? "Submitting..." : "Submit"}
              </Button>
            </Box>
          </>
        )}

        <Typography color="text.secondary" align="center" mt={2}>
          Step {step} of 3
        </Typography>
      </Box>
    </>
  );
};

export default CreateEmployee;

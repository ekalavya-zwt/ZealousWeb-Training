import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDepartments } from "../queries/UseDepartments";
import { useEmployee } from "../queries/useEmployee";
import { useUpdateEmployee } from "../mutations/useUpdateEmployee";
import useToast from "../hooks/useToast";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  MenuItem,
} from "@mui/material";

const UpdateEmployee = () => {
  const { id } = useParams();
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

  const {
    data: departments,
    isLoading: isDeptLoading,
    error: departmentError,
  } = useDepartments();

  const {
    data: employee,
    isLoading: isEmpLoading,
    error: employeeError,
  } = useEmployee(id);

  const {
    mutate: updateEmployeeMutation,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateEmployee();

  const { addToast } = useToast();

  const [inputs, setInputs] = useState(emptyForm);
  const [formError, setFormError] = useState({});

  useEffect(() => {
    if (employee) {
      setInputs({
        ...employee,
        hire_date: employee.hire_date?.split("T")[0] || "",
      });
    }
  }, [employee]);

  const handleInputs = (event) => {
    const { name, value } = event.target;

    setInputs((prev) => ({ ...prev, [name]: value }));

    if (formError[name]) {
      setFormError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const today = new Date();
  const inputDate = inputs.hire_date ? new Date(inputs.hire_date) : "";

  const handleUpdateEmployee = (event) => {
    event.preventDefault();

    const newErrors = {};

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
    if (Object.keys(newErrors).length > 0) {
      setFormError(newErrors);
      return;
    }

    setFormError({});
    updateEmployeeMutation(
      { id, data: inputs },
      {
        onSuccess: () => {
          addToast("Employee updated successfully", "success");
          navigate("/employees", { replace: true });
        },
      },
    );
  };

  if (isEmpLoading || isDeptLoading) {
    return (
      <Typography align="center" fontWeight={600}>
        Loading Data...
        <CircularProgress sx={{ display: "block", mx: "auto", mt: 2 }} />
      </Typography>
    );
  }

  if (employeeError) {
    return (
      <Alert severity="error">
        <Typography fontWeight={600}>{employeeError.message}</Typography>
      </Alert>
    );
  }

  if (departmentError) {
    return (
      <Alert severity="error">
        <Typography fontWeight={600}>{departmentError.message}</Typography>
      </Alert>
    );
  }

  return (
    <>
      {updateError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography fontWeight={600}>{updateError.message}</Typography>
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleUpdateEmployee}
        sx={{ maxWidth: 500, mx: "auto" }}
      >
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Edit Employee
        </Typography>

        <TextField
          label="First Name"
          name="first_name"
          value={inputs.first_name}
          onChange={handleInputs}
          fullWidth
          margin="normal"
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

        <TextField
          label="Hire Date"
          type="date"
          name="hire_date"
          value={inputs.hire_date}
          onChange={handleInputs}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
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
          disabled={isDeptLoading}
        >
          {departments?.map((department) => (
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

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isUpdating}
        >
          {isUpdating ? "Editing..." : "Edit"}
        </Button>
      </Box>
    </>
  );
};

export default UpdateEmployee;

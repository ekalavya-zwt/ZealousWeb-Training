import React, { useState, useEffect, useMemo } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { useEmployees } from "../queries/useEmployees";
import { useDeleteEmployee } from "../mutations/useDeleteEmployee";
import { formatCurrency, formatDate } from "../utils/formatters";
import useDebounce from "../hooks/useDebounce";
import RefreshIcon from "@mui/icons-material/Refresh";
import useToast from "../hooks/useToast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Stack,
  MenuItem,
  FormControl,
  Select,
  Box,
  Paper,
  Alert,
  Container,
  Pagination,
  IconButton,
} from "@mui/material";

const EmployeesList = () => {
  const emptyFilters = {
    first_name: "",
    last_name: "",
    email: "",
    salaryMin: "",
    salaryMax: "",
    hireDateFrom: "",
    hireDateTo: "",
    dept_id: "",
    state: "",
  };

  const { data, isLoading, error, refetch } = useEmployees();

  const {
    mutate: deleteEmployeeMutation,
    isPending: isDeleting,
    error: deleteError,
  } = useDeleteEmployee();

  const { addToast } = useToast();

  const [searchParams, setSearchParams] = useSearchParams();

  const itemsPerPage = 10;

  const [filters, setFilters] = useState(() => ({
    first_name: searchParams.get("first_name") || "",
    last_name: searchParams.get("last_name") || "",
    email: searchParams.get("email") || "",
    salaryMin: searchParams.get("salaryMin") || "",
    salaryMax: searchParams.get("salaryMax") || "",
    hireDateFrom: searchParams.get("hireDateFrom") || "",
    hireDateto: searchParams.get("hireDateto") || "",
    dept_id: searchParams.get("dept_id") || "",
    state: searchParams.get("state") || "",
  }));

  const debouncedFilters = useDebounce(filters, 400);

  const [currentPage, setCurrentPage] = useState(
    () => Number(searchParams.get("page")) || 1,
  );

  const filteredEmployees = useMemo(() => {
    return data?.filter((employee) => {
      const {
        first_name,
        last_name,
        email,
        salaryMin,
        salaryMax,
        hireDateFrom,
        hireDateTo,
        dept_id,
        state,
      } = debouncedFilters;

      if (
        first_name &&
        !employee.first_name
          .toLowerCase()
          .includes(first_name.toLowerCase().trim())
      )
        return false;
      if (
        last_name &&
        !employee.last_name
          .toLowerCase()
          .includes(last_name.toLowerCase().trim())
      )
        return false;
      if (
        email &&
        !employee.email.toLowerCase().includes(email.toLowerCase().trim())
      )
        return false;
      if (salaryMin && Number(employee.salary) < Number(salaryMin))
        return false;
      if (salaryMax && Number(employee.salary) > Number(salaryMax))
        return false;
      if (hireDateFrom && new Date(employee.hire_date) < new Date(hireDateFrom))
        return false;
      if (hireDateTo && new Date(employee.hire_date) > new Date(hireDateTo))
        return false;
      if (dept_id && Number(employee.dept_id) !== Number(dept_id)) return false;
      if (state && employee.state.toLowerCase() !== state.toLowerCase())
        return false;

      return true;
    });
  }, [debouncedFilters, data]);

  const totalPages = Math.ceil((filteredEmployees?.length || 0) / itemsPerPage);

  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredEmployees?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredEmployees, currentPage, itemsPerPage]);

  const updateFilters = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      deleteEmployeeMutation(id, {
        onSuccess: () => addToast("Employee deleted successfully", "success"),
      });
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedFilters]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [totalPages, currentPage]);

  useEffect(() => {
    const params = {};

    Object.entries(debouncedFilters).forEach(([key, value]) => {
      if (value) params[key] = value;
    });

    if (currentPage > 1) params.page = currentPage;

    setSearchParams(params);
  }, [debouncedFilters, currentPage, setSearchParams]);

  if (isLoading) {
    return (
      <Typography align="center" fontWeight={600}>
        Loading Employees...
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
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Typography variant="h4" fontWeight={600}>
              Employees
            </Typography>

            <IconButton
              title="Refresh"
              sx={{
                backgroundColor: "info.main",
                color: "white",
                borderRadius: "50%",
                "&:hover": {
                  backgroundColor: "info.dark",
                },
              }}
              onClick={refetch}
              disabled={isLoading}
            >
              <RefreshIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Stack>

          <Button
            variant="contained"
            color="primary"
            component={NavLink}
            to="/employees/add"
          >
            Add Employee
          </Button>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
            <TextField
              size="small"
              label="First Name"
              sx={{ width: 160 }}
              value={filters.first_name}
              onChange={(e) => updateFilters("first_name", e.target.value)}
            />

            <TextField
              size="small"
              label="Last Name"
              sx={{ width: 160 }}
              value={filters.last_name}
              onChange={(e) => updateFilters("last_name", e.target.value)}
            />

            <TextField
              size="small"
              label="Email"
              sx={{ width: 160 }}
              value={filters.email}
              onChange={(e) => updateFilters("email", e.target.value)}
            />

            <Stack direction="row" spacing={1}>
              <TextField
                size="small"
                type="number"
                label="Min Salary"
                sx={{ width: 130 }}
                value={filters.salaryMin}
                onChange={(e) => updateFilters("salaryMin", e.target.value)}
              />
              <TextField
                size="small"
                type="number"
                label="Max Salary"
                sx={{ width: 135 }}
                value={filters.salaryMax}
                onChange={(e) => updateFilters("salaryMax", e.target.value)}
              />
            </Stack>

            <Stack direction="row" spacing={1}>
              <TextField
                size="small"
                type="date"
                label="From"
                InputLabelProps={{ shrink: true }}
                sx={{ width: 145 }}
                value={filters.hireDateFrom}
                onChange={(e) => updateFilters("hireDateFrom", e.target.value)}
              />
              <TextField
                size="small"
                type="date"
                label="To"
                InputLabelProps={{ shrink: true }}
                sx={{ width: 145 }}
                value={filters.hireDateTo}
                onChange={(e) => updateFilters("hireDateTo", e.target.value)}
              />
            </Stack>

            <TextField
              size="small"
              type="number"
              label="Dept ID"
              sx={{ width: 110 }}
              value={filters.dept_id}
              onChange={(e) => updateFilters("dept_id", e.target.value)}
            />

            <FormControl size="small" sx={{ width: 130 }}>
              <Select
                displayEmpty
                value={filters.state}
                onChange={(e) => updateFilters("state", e.target.value)}
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="OnProject">OnProject</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="OnBoarded">OnBoarded</MenuItem>
                <MenuItem value="Terminated">Terminated</MenuItem>
              </Select>
            </FormControl>

            <Button
              color="inherit"
              variant="outlined"
              size="medium"
              sx={{ height: 40 }}
              onClick={() => setFilters(emptyFilters)}
            >
              Clear
            </Button>
          </Stack>
        </Box>

        <Box sx={{ mb: 3 }}>
          {deleteError && (
            <Alert severity="error">
              <Typography fontWeight={600}>{deleteError.message}</Typography>
            </Alert>
          )}
        </Box>

        {filteredEmployees?.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              mb: 4,
              color: "text.secondary",
            }}
          >
            <Typography variant="h6" gutterBottom>
              No employees found
            </Typography>
            <Typography variant="body2">
              Try adjusting your filters or clear them.
            </Typography>
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => {
                setFilters(emptyFilters);
                setCurrentPage(1);
              }}
            >
              Clear Filters
            </Button>
          </Box>
        )}

        <Box>
          <Paper
            elevation={1}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Table
              size="medium"
              sx={{
                "& th": {
                  fontWeight: 600,
                  backgroundColor: "action.hover",
                },
                "& td, & th": {
                  borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                  textAlign: "center",
                },
                "& tr:last-child td": {
                  borderBottom: "none",
                },
                "& tbody tr:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Salary</TableCell>
                  <TableCell>Hire Date</TableCell>
                  <TableCell>Department ID</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedEmployees?.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.id}</TableCell>
                    <TableCell>{employee.first_name} </TableCell>
                    <TableCell>{employee.last_name} </TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{formatCurrency(employee.salary)}</TableCell>
                    <TableCell>{formatDate(employee.hire_date)}</TableCell>
                    <TableCell>{employee.dept_id}</TableCell>
                    <TableCell>{employee.state}</TableCell>
                    <TableCell>
                      <Stack
                        direction="row"
                        spacing={1.5}
                        justifyContent="center"
                      >
                        <Button
                          component={NavLink}
                          to={`/employees/edit/${employee.id}`}
                          variant="outlined"
                          color="info"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDeleteEmployee(employee.id)}
                          disabled={isDeleting}
                        >
                          {isDeleting ? "Deleting..." : "Delete"}
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          {filteredEmployees?.length > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 3,
                mt: 3,
              }}
            >
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(e, page) => setCurrentPage(page)}
                color="primary"
                shape="rounded"
              />
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default EmployeesList;

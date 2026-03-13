import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useSalaryReport } from "../queries/useSalaryReport";
import { useDepartments } from "../queries/useDepartments";
import { formatCurrency } from "../utils/formatters";
import useDebounce from "../hooks/useDebounce";
import RefreshIcon from "@mui/icons-material/Refresh";
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

const SalaryReport = () => {
  const emptyFilters = {
    first_name: "",
    last_name: "",
    email: "",
    salaryMin: "",
    salaryMax: "",
    salary: "",
    dept_name: "",
  };

  const {
    data: report,
    isLoading: isReportLoading,
    error: reportError,
    refetch,
  } = useSalaryReport();

  const {
    data: departments,
    isLoading: isDeptLoading,
    error: deptError,
  } = useDepartments();

  const [searchParams, setSearchParams] = useSearchParams();

  const itemsPerPage = 10;

  const [filters, setFilters] = useState(() => ({
    first_name: searchParams.get("first_name") || "",
    last_name: searchParams.get("last_name") || "",
    email: searchParams.get("email") || "",
    salaryMin: searchParams.get("salaryMin") || "",
    salaryMax: searchParams.get("salaryMax") || "",
    salary: searchParams.get("salary") || "",
    dept_name: searchParams.get("dept_name") || "",
  }));

  const debouncedFilters = useDebounce(filters, 400);

  const [currentPage, setCurrentPage] = useState(
    () => Number(searchParams.get("page")) || 1,
  );

  const filteredEmployees = useMemo(() => {
    const result = report?.filter((employee) => {
      const { first_name, last_name, email, salaryMin, salaryMax, dept_name } =
        debouncedFilters;

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
      if (
        dept_name &&
        employee.dept_name.toLowerCase() !== dept_name.toLowerCase()
      )
        return false;

      return true;
    });

    if (debouncedFilters.salary) {
      result?.sort((a, b) =>
        debouncedFilters.salary === "asc"
          ? Number(a.salary) - Number(b.salary)
          : Number(b.salary) - Number(a.salary),
      );
    }

    return result;
  }, [debouncedFilters, report]);

  const totalPages = Math.ceil((filteredEmployees?.length || 0) / itemsPerPage);

  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredEmployees?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredEmployees, currentPage, itemsPerPage]);

  const updateFilters = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const exportToCSV = () => {
    if (filteredEmployees?.length === 0) return;

    const headers = [
      "ID",
      "First Name",
      "Last Name",
      "Email",
      "Department",
      "Salary",
    ];

    const rows = filteredEmployees?.map((employee) => [
      employee.id,
      employee.first_name,
      employee.last_name,
      employee.email,
      employee.dept_name,
      formatCurrency(employee.salary),
    ]);

    const content = [headers, ...rows]
      .map((row) => row.map((value) => `"${value}"`).join(","))
      .join("\n");

    const BOM = "\uFEFF";

    const blob = new Blob([BOM + content], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "report.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
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

  if (isReportLoading || isDeptLoading) {
    return (
      <Typography align="center" fontWeight={600}>
        Loading Report...
        <CircularProgress sx={{ display: "block", mx: "auto", mt: 2 }} />
      </Typography>
    );
  }

  if (reportError) {
    return (
      <Alert severity="error">
        <Typography fontWeight={600}>{reportError.message}</Typography>
      </Alert>
    );
  }

  if (deptError) {
    return (
      <Alert severity="error">
        <Typography fontWeight={600}>{deptError.message}</Typography>
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
              Salary Report
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
              disabled={isReportLoading}
            >
              <RefreshIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Stack>

          <Button
            variant="contained"
            color="success"
            onClick={exportToCSV}
            disabled={filteredEmployees?.length === 0}
          >
            Export CSV
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
              <FormControl size="small" sx={{ width: 160 }}>
                <Select
                  displayEmpty
                  value={filters.salary}
                  onChange={(e) => {
                    updateFilters("salary", e.target.value);
                  }}
                >
                  <MenuItem value="">Sort By Salary</MenuItem>
                  <MenuItem value="desc">Highest First</MenuItem>
                  <MenuItem value="asc">Lowest First</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <FormControl size="small" sx={{ width: 170 }}>
              <Select
                displayEmpty
                value={filters.dept_name}
                onChange={(e) => updateFilters("dept_name", e.target.value)}
              >
                <MenuItem value="">All Departments</MenuItem>
                {departments?.map((department) => (
                  <MenuItem
                    key={department.dept_id}
                    value={department.dept_name}
                  >
                    {department.dept_name}
                  </MenuItem>
                ))}
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
                  <TableCell>Department</TableCell>
                  <TableCell>Salary</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedEmployees?.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.id}</TableCell>
                    <TableCell>{employee.first_name} </TableCell>
                    <TableCell>{employee.last_name} </TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.dept_name}</TableCell>
                    <TableCell>{formatCurrency(employee.salary)}</TableCell>
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

export default SalaryReport;

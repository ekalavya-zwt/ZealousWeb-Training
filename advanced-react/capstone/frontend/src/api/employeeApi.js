export const fetchEmployees = async () => {
  const res = await fetch("/api/employees");

  if (!res.ok) {
    throw new Error("Failed to fetch employees");
  }

  return res.json();
};

export const fetchSalaryReport = async () => {
  const res = await fetch("/api/report");

  if (!res.ok) {
    throw new Error("Failed to fetch salary report");
  }

  return res.json();
};

export const fetchEmployeeByID = async (id) => {
  const res = await fetch(`/api/employees/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch employee");
  }

  return res.json();
};

export const fetchDepartments = async () => {
  const res = await fetch("/api/departments");

  if (!res.ok) {
    throw new Error("Failed to fetch departments");
  }

  return res.json();
};

export const fetchStats = async () => {
  const res = await fetch("/api/dashboard");

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard metrics");
  }

  return res.json();
};

export const loginEmployee = async (credentials) => {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    throw new Error("Invalid email or password");
  }

  return res.json();
};

export const createEmployee = async (employeeData) => {
  const res = await fetch("/api/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeData),
  });

  if (!res.ok) {
    throw new Error("Failed to create employee");
  }

  return res.json();
};

export const updateEmployee = async ({ id, data }) => {
  const res = await fetch(`/api/employees/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update employee");
  }

  return res.json();
};

export const deleteEmployee = async (id) => {
  const res = await fetch(`/api/employees/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete employee");
  }

  return res.json();
};

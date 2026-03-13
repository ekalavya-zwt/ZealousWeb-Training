const express = require("express");
const dotenv = require("dotenv");
const con = require("./db");

dotenv.config();

const app = express();

app.use(express.json());

const employees = [
  {
    id: 9,
    first_name: "Daniel",
    last_name: "Clark",
    email: "daniel.clark@company.com",
    hire_date: "2023-01-10",
    salary: 71000,
    dept_id: 2,
    state: "ONBOARDED",
  },
  {
    id: 10,
    first_name: "Olivia",
    last_name: "Martinez",
    email: "olivia.m@company.com",
    hire_date: "2021-11-05",
    salary: 88000,
    dept_id: 1,
    state: "ONPROJECT",
  },
  {
    id: 11,
    first_name: "Liam",
    last_name: "Garcia",
    email: "liam.garcia@company.com",
    hire_date: "2022-05-18",
    salary: 76000,
    dept_id: 3,
    state: "ONPROJECT",
  },
  {
    id: 12,
    first_name: "Sophia",
    last_name: "Lopez",
    email: "sophia.lopez@company.com",
    hire_date: "2023-03-14",
    salary: 64000,
    dept_id: 2,
    state: "ONBOARDED",
  },
  {
    id: 13,
    first_name: "Noah",
    last_name: "Harris",
    email: "noah.harris@company.com",
    hire_date: "2020-09-22",
    salary: 95000,
    dept_id: 1,
    state: "ONPROJECT",
  },
  {
    id: 14,
    first_name: "Ava",
    last_name: "Walker",
    email: "ava.walker@company.com",
    hire_date: "2022-12-01",
    salary: 67000,
    dept_id: 4,
    state: "ONPROJECT",
  },
  {
    id: 15,
    first_name: "William",
    last_name: "Hall",
    email: "william.hall@company.com",
    hire_date: "2021-06-30",
    salary: 82000,
    dept_id: 3,
    state: "TERMINATED",
  },
  {
    id: 16,
    first_name: "Mia",
    last_name: "Allen",
    email: "mia.allen@company.com",
    hire_date: "2023-07-09",
    salary: 60000,
    dept_id: 2,
    state: "ONBOARDED",
  },
  {
    id: 17,
    first_name: "Benjamin",
    last_name: "Young",
    email: "benjamin.young@company.com",
    hire_date: "2022-03-11",
    salary: 74000,
    dept_id: 3,
    state: "ONPROJECT",
  },
  {
    id: 18,
    first_name: "Charlotte",
    last_name: "King",
    email: "charlotte.king@company.com",
    hire_date: "2021-08-17",
    salary: 83000,
    dept_id: 1,
    state: "ONPROJECT",
  },
  {
    id: 19,
    first_name: "Lucas",
    last_name: "Scott",
    email: "lucas.scott@company.com",
    hire_date: "2023-04-25",
    salary: 69000,
    dept_id: 4,
    state: "ONBOARDED",
  },
  {
    id: 20,
    first_name: "Amelia",
    last_name: "Green",
    email: "amelia.green@company.com",
    hire_date: "2022-10-06",
    salary: 72000,
    dept_id: 2,
    state: "ONPROJECT",
  },
];

async function seed() {
  const values = employees.map((emp) => [
    emp.id,
    emp.first_name,
    emp.last_name,
    emp.email,
    emp.hire_date,
    emp.salary,
    emp.dept_id,
    emp.state,
  ]);

  await con.query(
    `INSERT INTO employees
    (id, first_name, last_name, email, hire_date, salary, dept_id, state)
    VALUES ?`,
    [values],
  );

  console.log("Employees inserted successfully");
}

seed();

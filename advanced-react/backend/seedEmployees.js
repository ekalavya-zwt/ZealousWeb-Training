const express = require("express");
const dotenv = require("dotenv");
const con = require("./db");

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

async function seed() {
  for (let i = 1; i <= 1000; i++) {
    await con.query(
      `INSERT INTO dummy_employees
      (first_name, last_name, email, hire_date, salary, dept_id)
      VALUES (?, ?, ?, CURDATE(), ?, ?)`,
      [
        `Employee`,
        `${i}`,
        `employee${i}@company.com`,
        Math.floor(Math.random() * 80000) + 30000,
        Math.floor(Math.random() * 5) + 1,
        "ONPROJECT",
      ],
    );
  }

  console.log("1000 employees inserted successfully");
}

seed();

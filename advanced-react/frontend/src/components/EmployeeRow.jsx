import React from "react";

const EmployeeRow = ({ employee, style }) => {
  return (
    <div className="table-row" style={style}>
      <div>{employee.id}</div>
      <div>
        {employee.first_name} {employee.last_name}
      </div>
      <div>{employee.email}</div>
      <div>{employee.hire_date ? employee.hire_date.split("T")[0] : ""}</div>
      <div>{employee.salary}</div>
      <div>{employee.dept_id}</div>
    </div>
  );
};

export default EmployeeRow;

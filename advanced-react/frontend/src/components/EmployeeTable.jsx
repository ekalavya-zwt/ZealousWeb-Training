import React from "react";
import { FixedSizeList } from "react-window";
import EmployeeRow from "./EmployeeRow";

const FetchDummies = ({ employees }) => {
  return (
    <div className="table-container">
      <div className="table-header">
        <div>ID</div>
        <div>Name</div>
        <div>Email</div>
        <div>Hire Date</div>
        <div>Salary</div>
        <div>Dept ID</div>
      </div>

      <FixedSizeList
        height={900}
        itemCount={employees.length}
        itemSize={50}
        width="100%"
        overscanCount={10}
      >
        {({ index, style }) => (
          <EmployeeRow employee={employees[index]} style={style} />
        )}
      </FixedSizeList>
    </div>
  );
};

export default FetchDummies;

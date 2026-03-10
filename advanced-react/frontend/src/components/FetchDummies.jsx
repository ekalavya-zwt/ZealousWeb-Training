import React from "react";
import "../styles/VirtualizedTable.css";
import EmployeeTable from "./EmployeeTable";
import { useDummyEmployees } from "../queries/useDummyEmployees";

const TableHeader = () => {
  const { data, isLoading, error } = useDummyEmployees();

  if (isLoading) return <p>Loading employees...</p>;
  if (error) return <p>Error loading employees</p>;

  return <EmployeeTable employees={data} />;
};

export default TableHeader;

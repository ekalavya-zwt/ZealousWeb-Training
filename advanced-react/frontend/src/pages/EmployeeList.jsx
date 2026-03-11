import { NavLink, useOutletContext } from "react-router-dom";

function EmployeeList() {
  const { currentUser } = useOutletContext();

  const employees = [
    { id: 1, name: "John" },
    { id: 2, name: "Sara" },
    { id: 3, name: "James" },
    { id: 4, name: "Andrew" },
    { id: 5, name: "Laura" },
  ];

  return (
    <div>
      <h3 style={{ marginBottom: "5px" }}>Employees</h3>

      {employees.map((emp) => (
        <div key={emp.id}>
          <NavLink style={{ textDecoration: "underline" }} to={`${emp.id}`}>
            {emp.name}
          </NavLink>
        </div>
      ))}

      <p style={{ marginTop: "5px" }}>Logged in as: {currentUser.name}</p>
    </div>
  );
}

export default EmployeeList;

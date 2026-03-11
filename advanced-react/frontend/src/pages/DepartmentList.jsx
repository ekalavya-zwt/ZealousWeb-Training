import { useOutletContext } from "react-router-dom";

function DepartmentList() {
  const { currentUser } = useOutletContext();

  const departments = [
    { id: 1, department: "Engineering" },
    { id: 2, department: "Marketing" },
    { id: 3, department: "Sales" },
    { id: 4, department: "HR" },
  ];

  return (
    <div>
      <h3 style={{ marginBottom: "5px" }}>Departments</h3>

      {departments.map((dept) => (
        <ul key={dept.id} style={{ listStyleType: "none" }}>
          <li>{dept.department}</li>
        </ul>
      ))}

      <p style={{ marginTop: "5px" }}>Logged in as: {currentUser.name}</p>
    </div>
  );
}

export default DepartmentList;

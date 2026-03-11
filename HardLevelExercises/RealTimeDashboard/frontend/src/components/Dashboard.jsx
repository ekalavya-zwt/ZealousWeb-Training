import { useEmployeeStore } from "../store/useEmployeeStore";
import { useEmployeeSocket } from "../hooks/useEmployeeSocket";
import ConnectionStatus from "./ConnectionStatus";

function Dashboard() {
  const employees = useEmployeeStore((s) => s.employees);

  const { status } = useEmployeeSocket();

  return (
    <div>
      <header>
        <h2>Employee Activity Dashboard</h2>
        <ConnectionStatus status={status} />
      </header>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Salary</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;

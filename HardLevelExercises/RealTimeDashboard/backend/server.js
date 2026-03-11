const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3001 });

console.log("WebSocket server running on ws://localhost:3001");

let employeeId = 3;
const employees = [
  { id: 1, name: "John", salary: 50000 },
  { id: 2, name: "Sara", salary: 60000 },
];

const getRandomEmployee = () => {
  if (employees.length === 0) return null;
  return employees[Math.floor(Math.random() * employees.length)];
};

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.send(
    JSON.stringify({
      type: "employees_initial",
      payload: employees,
    }),
  );

  const sendEvent = (event) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(event));
    }
  };

  const interval = setInterval(() => {
    const random = Math.floor(Math.random() * 3);
    const randomEmployee = getRandomEmployee();

    // Create
    if (random === 0) {
      const id = employeeId++;

      const newEmployee = {
        id,
        name: "Employee " + id,
        salary: 40000 + Math.floor(Math.random() * 20000),
      };

      employees.push(newEmployee);

      sendEvent({
        type: "employee_created",
        payload: newEmployee,
      });
    }

    // Update
    if (random === 1 && randomEmployee) {
      randomEmployee.salary = 50000 + Math.floor(Math.random() * 30000);

      sendEvent({
        type: "salary_updated",
        payload: {
          id: randomEmployee.id,
          salary: randomEmployee.salary,
        },
      });
    }

    // Delete
    if (random === 2 && randomEmployee) {
      sendEvent({
        type: "employee_deleted",
        payload: { id: randomEmployee.id },
      });

      employees.splice(
        employees.findIndex((e) => e.id === randomEmployee.id),
        1,
      );
    }
  }, 5000);

  ws.on("close", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

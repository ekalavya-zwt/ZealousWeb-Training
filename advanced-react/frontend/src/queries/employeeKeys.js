export const employeeKeys = {
  all: ["employees"],
  allDummy: ["dummy_employees"],
  list: (filters) => ["employees", "list", filters],
  detail: (id) => ["employees", "detail", id],
};

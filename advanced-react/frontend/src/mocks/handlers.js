import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/employees", () =>
    HttpResponse.json([
      { id: 1, firstName: "John", lastName: "Doe", salary: 75000 },
      { id: 2, firstName: "Jane", lastName: "Smith", salary: 82000 },
    ]),
  ),

  http.post("/api/employees", async ({ request }) => {
    const body = await request.json();

    return HttpResponse.json({ id: 3, ...body }, { status: 201 });
  }),

  http.delete("/api/employees/:id", () =>
    HttpResponse.json({ message: "Deleted successfully" }),
  ),
];

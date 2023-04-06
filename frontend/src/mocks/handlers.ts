import { rest } from "msw";
import { v4 as uuidv4 } from "uuid";

const apiUrl = process.env.API_URL;

let todos = [
  {
    id: "68593a16-f167-4410-9a21-1c98dec13986",
    todo: "Buy Milk and done",
    status: "PENDING",
    createdAt: "2023-04-06T07:39:47.868Z",
  },
];

export const handlers = [
  rest.get(`${apiUrl}/todos`, (req, res, ctx) => {
    console.log(todos);
    return res(ctx.json(todos));
  }),

  rest.post(`${apiUrl}/todos`, (req, res, ctx) => {
    const { todo, status } = req.body;

    const newTodo = {
      id: uuidv4(), // Generate a unique id
      todo,
      status,
      createdAt: new Date().toISOString(), // Generate a timestamp in ISO format
    };

    todos.push(newTodo);

    // Return the new todo as the response
    return res(
      ctx.status(201), // Set the HTTP status code to 201 (Created)
      ctx.json(newTodo)
    );
  }),

  rest.put(`${apiUrl}/todos/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const { todo, status } = req.body;

    const oldTodo = todos.find((i) => i.id === id);
    const newTodo = { ...oldTodo, todo, status };
    const index = todos.findIndex((element) => element.id === id);

    if (index >= 0) {
      todos.splice(index, 1, newTodo);
    }

    // Return the new todo as the response
    return res(
      ctx.status(201), // Set the HTTP status code to 201 (Created)
      ctx.json(newTodo)
    );
  }),

  rest.delete(`${apiUrl}/todos/:id`, (req, res, ctx) => {
    const { id } = req.params;

    const deletedTodo = {
      id: id,
      todo: "Buy Kheera",
      status: "DONE",
      createdAt: "2023-03-28T11:38:24.002Z",
    };
    console.log(id);
    todos = todos.filter((i) => i.id != deletedTodo.id);

    // Return the deleted todo as the response
    return res(
      ctx.status(200), // Set the HTTP status code to 200 (OK)
      ctx.json(deletedTodo)
    );
  }),
];

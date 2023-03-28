import { Router } from "express";
import { prisma } from "./db";

const router = Router();

router.get("/", async (req, res) => {
  const alltodos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.status(200).json(alltodos);
});

router.post("/", async (req, res) => {
  const todo = await prisma.todo.create({
    data: req.body,
  });

  res.status(201).json(todo);
});

router.get("/:id", async (req, res) => {
  const todo = await prisma.todo.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(todo);
});

router.put("/:id", async (req, res) => {
  const todo = await prisma.todo.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });
  res.status(200).json(todo);
});

router.delete("/:id", async (req, res) => {
  const todo = await prisma.todo.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(todo);
});

export default router;

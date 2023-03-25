import { Router } from "express";
import { prisma } from './db.js'

const router = Router();

router.get('/', async (req, res) => {
    const alltodos = await prisma.todo.findMany()
    res.send(alltodos)
})


export default router

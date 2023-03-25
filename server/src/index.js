import express from 'express'
import todoRouter from './todoRouter.js'

const app = express()

app.get('/', async (req, res) => {
    res.send("default route")
})

app.use('/todos', todoRouter)

app.listen('4000', () => {
    console.log("server started")
})

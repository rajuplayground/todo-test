import express from 'express'
import todoRouter from './todoRouter.js'
import morgan from 'morgan'
import bodyParser from 'body-parser'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('combined'))

app.get('/', async (req, res) => {
    res.send("default route dibe")
})

app.use('/todos', todoRouter)

app.listen('4000', () => {
    console.log("server started")
})

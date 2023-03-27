import express from 'express'
import todoRouter from './todoRouter.js'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import { prisma } from './db.js'

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('combined'))

app.get('/', async (req, res) => {
    res.send("default route dibe")
})

app.get('/healthcheck', async (req, res) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
    };
    try {
        // check if database connection is working
        await prisma.$connect();
        healthcheck.database = {
            status: 'OK',
            responseTime: Date.now() - healthcheck.timestamp,
        };
        await prisma.$disconnect();
    } catch (err) {
        healthcheck.database = {
            status: 'Failed',
            responseTime: Date.now() - healthcheck.timestamp,
            error: err,
        };
    }
    res.json(healthcheck);
});

app.use('/todos', todoRouter)

app.listen('4000', () => {
    console.log("server started")
})

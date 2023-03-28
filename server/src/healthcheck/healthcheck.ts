import { Router } from "express";
import { prisma } from "../db";

const router = Router();

router.get("/", async (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
    database: {},
  };
  try {
    // check if database connection is working
    await prisma.$connect();
    healthcheck.database = {
      status: "OK",
      responseTime: Date.now() - healthcheck.timestamp,
    };
    await prisma.$disconnect();
  } catch (err) {
    healthcheck.database = {
      status: "Failed",
      responseTime: Date.now() - healthcheck.timestamp,
      error: err,
    };
  }
  res.json(healthcheck);
});

export default router;

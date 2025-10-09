import express from "express";
import employeesRouter from "./api/employees";
const app = express();
export default app;

// TODO: this file!
app.use(express.json());

app.use("/", employeesRouter);

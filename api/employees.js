import express from "express";
const router = express.Router();
export default router;

// TODO: this file!
import {
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees";

router.route("/").get(async (req, res) => {
  res.send("Welcome to the Fullstack Employees API");
});

router.route("/employees").get(async (req, res) => {
  try {
    const response = await getEmployees();
    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

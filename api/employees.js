import express from "express";
const router = express.Router();
export default router;

// TODO: this file!
import {
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  createEmployee,
} from "#db/queries/employees";

router.route("/").get(async (req, res) => {
  res.send("Welcome to the Fullstack Employees API");
});

router
  .route("/employees")
  .get(async (req, res) => {
    try {
      const response = await getEmployees();
      res.send(response);
    } catch (error) {
      res.status(500).send(error);
    }
  })
  .post(async (req, res) => {
    if (!req.body) {
      res.status(400).send({ error: "Body is required" });
    }

    const { name, birthday, salary } = req.body;

    if (!name) {
      return res.status(400).send({ error: "Name is required" });
    }
    if (!birthday) {
      return res.status(400).send({ error: "Birthday is required" });
    }
    if (!salary) {
      return res.status(400).send({ error: "Salary is required" });
    }

    try {
      const response = await createEmployee({ name, birthday, salary });
      res.status(201).send(response);
    } catch (error) {
      res.status(500).send(error);
    }
  });

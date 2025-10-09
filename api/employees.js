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

router
  .route("/employees/:id")
  .get(async (req, res) => {
    const { id } = req.params;

    // Check if ID is a positive integer (only digits allowed)
    // a REGEX - checking for only digits start to end
    // negative sign (-), decimal (.), letters (abc) will all error
    if (!/^\d+$/.test(id)) {
      return res.status(400).send({ error: "ID must be a positive integer" });
    }

    try {
      const response = await getEmployee(id);
      if (!response) {
        res.status(404).send({ error: "Employee does not exist" });
      }
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error);
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
      return res.status(400).send({ error: "ID must be a positive integer" });
    }

    try {
      const response = await deleteEmployee(id);
      if (!response) {
        res.status(404).send({ error: "Employee does not exist" });
      }
      res.status(204);
    } catch (error) {
      res.status(500).send(error);
    }
  });

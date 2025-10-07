import db from "#db/client";
import { createEmployee } from "#db/queries/employees";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  // TODO
  const employees = [
    {
      name: "Goku",
      birthday: "1969-06-09",
      salary: 1000,
    },
    {
      name: "Gohan",
      birthday: "1989-08-11",
      salary: 213,
    },
    {
      name: "Goten",
      birthday: "1999-12-12",
      salary: 7345,
    },
    {
      name: "Vegeta",
      birthday: "1969-06-06",
      salary: 377,
    },
    {
      name: "Trunks",
      birthday: "1989-08-08",
      salary: 73,
    },
    {
      name: "Bulma",
      birthday: "1969-06-09",
      salary: 73127,
    },
    {
      name: "Piccolo",
      birthday: "1923-02-03",
      salary: 93254,
    },
    {
      name: "Tien",
      birthday: "1945-04-05",
      salary: 7853,
    },
    {
      name: "Yamcha",
      birthday: "1966-06-06",
      salary: 17,
    },
    {
      name: "Cell",
      birthday: "1000-12-25",
      salary: 1000000,
    },
  ];

  for (const employee of employees) {
    await createEmployee(employee);
    console.log(`Created employee: ${employee.name}`);
  }
}

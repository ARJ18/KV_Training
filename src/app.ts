import express from "express";
import loggerMiddleware from "./middleware/logger.middleware";
import bodyParser from "body-parser";
import dataSource from "./db/data-source.db";
import employeeRouter from "./routes/employee.routes";
import errorMiddleware from "./middleware/error.middleware";
import "reflect-metadata";
import departmentRouter from "./routes/department.routes";
import cors from "cors"
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(loggerMiddleware);

app.use("/employee", employeeRouter);
app.use("/department",departmentRouter);

app.use(errorMiddleware);
(async () => {
  try {
    await dataSource.initialize();
  } catch (e) {
    console.log("Failed to connect to db", e);
    process.exit(1);
  }

  app.listen(3000, () => {
    console.log("Server listening to 3000");
  });
})();

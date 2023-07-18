import express from "express";
import { routes } from "./routes";

const app = express();

app.use(express.json());

routes(app);

app.listen(3000, () =>
  console.log("REST API server ready at: http://localhost:3000")
);

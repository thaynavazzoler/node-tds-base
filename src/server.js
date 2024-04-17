import express from "express";
import { config } from "dotenv";
import { router } from "./routes/index.routes.js";

//connection();
config();

const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(router);

app.listen(port, () =>
  console.log(`⚡ Server started on http://localhost:${port}`)
);
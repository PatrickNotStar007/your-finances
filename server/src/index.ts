import express from "express";
import cors from "cors";

import { ENV } from "./config/env";

const app = express();
const port = 5000;

app.use(cors({ origin: ENV.FRONTEND_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/ping", (req, res) => {
  res.send({ message: "ok" });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту http://localhost:${ENV.PORT}`);
});

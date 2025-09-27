import express from "express";
import "express-async-errors";
import { errorHandling } from "./middlewares/error-handling";
import { routes } from "./routes";

const PORT = 3333;
const app = express();

app.use(express.json());

app.use(errorHandling);

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

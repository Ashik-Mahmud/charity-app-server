import cors from "cors";
import "dotenv/config";
import express, { Application, Request, Response } from "express";

const app: Application = express();

/* middleware  */
app.use(cors());
app.use(express.json());

/* here will be all the imports routes */
import userRouter from "./routes/UserRoute";

/* here will be the all the routes */
app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Charity Server is working by default" });
});

/* Here is the User Routes */
app.use("/api", userRouter);

export { app };

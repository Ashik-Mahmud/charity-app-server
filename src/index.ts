import mongoose from "mongoose";
import { app } from "./app";

const port: string | number = process.env.PORT || 5000;

/* Start Server Function to start the server and Database*/
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to MongoDB");
    /* listen server */
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log("Server Connection Error: ", error);
  }
};
startServer();

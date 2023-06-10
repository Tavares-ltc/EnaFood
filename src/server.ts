import { app } from "./app.js";
import dotenv from "dotenv";
import { connectToDB } from "./database/mongodb.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

connectToDB()
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log("Server running on port " + PORT)
    );
  })
  .catch(() => console.log("Failed to connect DB"));

import { app, init } from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

init()
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log("Server running on port " + PORT)
    );
  })
  .catch(() => console.log("Failed to connect DB"));

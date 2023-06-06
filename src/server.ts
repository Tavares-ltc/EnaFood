import { app } from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || 3000;
const DATABASE_URI = process.env.DATABASE_URI || "mongodb://localhost/enafood";

mongoose
  .connect(DATABASE_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log("Server running on port " + PORT)
    );
  })
  .catch(() => console.log("Failed to connect DB"));

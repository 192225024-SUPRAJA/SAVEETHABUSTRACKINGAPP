import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import route from "./routes/userRoute.js";
import adminroute from "./routes/adminRoute.js";
import busroute from "./routes/busRoute.js";

const app = express();

app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Database connected successfully.");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => console.log(error));

    app.use("/api/user", route);
    app.use("/api/admin",adminroute);
    app.use("/api/bus",busroute);
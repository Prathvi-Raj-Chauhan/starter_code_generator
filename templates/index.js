require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const indexRouter = require("./router/index");
const authRouter = require("./router/auth");

const app = express();

app.use(express.json());

// Routes
app.use("/", indexRouter);
app.use("/auth", authRouter);

// MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(process.env.PORT || 3000, () => {
            console.log(
                `Server running on port ${process.env.PORT || 3000}`
            );
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    });
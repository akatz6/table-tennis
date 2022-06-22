const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8010;
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send({ message: "Hello" });
});

//Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);
app.listen(PORT, () => console.log("server Started"));

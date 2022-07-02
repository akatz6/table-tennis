const express = require("express");
const fileUpload = require("express-fileupload");
// const multer = require("multer");
// const upload = multer({ dest: 'images/' });

const path = require("path");
const colors = require("colors");
const dotenv = require("dotenv").config();



const PORT = process.env.PORT || 8010;
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
connectDB();

const app = express();

app.use(express.json({}));
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send({ message: "Hello" });
});

//Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use(
  "/api/players",
  require("./routes/playerRoutes")
);

// app.post("/api/players", upload.single("file"), (req, res) => {
//   console.log(req.file);
//   res.json("/image api");
// });
app.use(errorHandler);
app.listen(PORT, () => console.log("server Started"));

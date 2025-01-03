const express = require("express");
require("dotenv").config();
require("./config/scheduler");
const cors = require("cors");
const corsConfig = require("./config/cors");
const userRoutes = require("./routes/users");
const attendanceRoutes = require("./routes/attendance");
const authRoutes = require("./routes/auth");
const PORT = 4000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsConfig));
app.use(express.json());

app.use("/users", userRoutes);
app.use("/attendances", attendanceRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Server is running in localhost 4000.");
});

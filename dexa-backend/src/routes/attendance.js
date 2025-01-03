const express = require("express");
const upload = require("../config/multer");
const { authenticateToken } = require("../middleware/authMiddleware.js");
const AttendanceController = require("../controller/attendance");

const router = express.Router();
router.get(
  "/today",
  authenticateToken,
  AttendanceController.getEmployeeAttendanceToday
);
router.get("/:id", AttendanceController.getAllEmployeeAttendance);

router.post(
  "/",
  authenticateToken,
  upload.single("imageFile"),
  AttendanceController.createEmployeeAttendance
);
router.patch(
  "/",
  authenticateToken,
  upload.single("imageFile"),
  AttendanceController.updateEmployeeAttendance
);

module.exports = router;

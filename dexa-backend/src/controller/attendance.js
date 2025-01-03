const {
  sendResponse,
  failResponseServer,
  sendResponsePagination,
} = require("../utils/response.js");
const attendanceModel = require("../models/attendance.js");
const { uploadImageToCloudinary } = require("../controller/cloudinary.js");
const { createAttendanceProof } = require("../controller/attendanceProof.js");
const { getAllUsers, getEmployeeById } = require("../controller/users.js");

const getAllEmployeeAttendance = async (req, res) => {
  try {
    const id = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    const [attendances] = await attendanceModel.getAllEmployeeAttendances(
      limit,
      offset,
      id
    );
    const processedData = attendances.map((item) => {
      if (item.proofs) {
        try {
          const proofString = `[${item.proofs}]`;
          item.proofs = JSON.parse(proofString);
        } catch (error) {
          console.error("Error parsing proofs:", error);
          item.proofs = [];
        }
      } else {
        item.proofs = [];
      }
      return item;
    });
    const [totalCountResult] = await attendanceModel.getEmployeeAttendanceCount(
      id
    );
    const totalData = totalCountResult[0].count;
    const totalPages = Math.ceil(totalData / limit);
    const user = await getEmployeeById(id);
    const finalData = {
      id: user.id,
      name: user.name,
      email: user.email,
      code: user.code,
      attendances: processedData,
    };
    res
      .status(200)
      .json(
        sendResponsePagination(
          200,
          "All employee attendances data has been fetched",
          finalData,
          totalPages,
          totalData,
          page
        )
      );
  } catch (error) {
    res.json(
      failResponseServer(500, "Error fetching employee attendances data", error)
    );
  }
};

const getEmployeeAttendanceToday = async (req, res) => {
  try {
    const id = req.user.userId;
    const today = new Date();
    const todayDate = today.toISOString().split("T")[0];
    const attendances = await attendanceModel.getEmployeeAttendanceToday(
      id,
      todayDate
    );
    res
      .status(200)
      .json(
        sendResponse(
          200,
          "Employee attendance data today has been fetched",
          attendances
        )
      );
  } catch (error) {
    res.json(
      failResponseServer(500, "Error fetching employee attendance data", error)
    );
  }
};

const createEmployeeAttendance = async (req, res) => {
  const id = req.user.userId;
  const { attendanceDate, attendanceTime } = req.body;
  if (!req.file || !attendanceTime || !attendanceDate) {
    return res
      .status(400)
      .json(failResponseServer(400, "All fields are required"));
  }
  const imageUrl = await uploadImageToCloudinary(req.file.path);
  const attendance = await attendanceModel.createNewEmployeeAttendance(
    id,
    attendanceTime,
    attendanceDate
  );
  const attendanceProof = await createAttendanceProof(imageUrl, attendance.id);
  const response = {
    ...attendance,
    proofs: attendanceProof,
  };
  res
    .status(201)
    .json(
      sendResponse(
        201,
        "Employee attendance has been recorded successfully",
        response
      )
    );
};

const updateEmployeeAttendance = async (req, res) => {
  const id = req.user.userId;
  const { attendanceDate, attendanceTime } = req.body;
  if (!req.file || !attendanceTime || !attendanceDate) {
    return res
      .status(400)
      .json(failResponseServer(400, "All fields are required"));
  }
  const imageUrl = await uploadImageToCloudinary(req.file.path);
  const attendance = await attendanceModel.updateEmployeeAttendance(
    id,
    attendanceDate,
    attendanceTime
  );
  const attendanceProof = await createAttendanceProof(imageUrl, attendance.id);
  const response = {
    ...attendance,
    proofs: attendanceProof,
  };
  res
    .status(200)
    .json(
      sendResponse(
        200,
        "Employee attendance has been recorded successfully",
        response
      )
    );
};

const checkAndCreateAttendance = async () => {
  const currentDate = new Date();
  const previousDate = new Date(currentDate);
  previousDate.setDate(currentDate.getDate() - 1);
  const currentDateString = currentDate.toISOString().split("T")[0];
  const previousDateString = previousDate.toISOString().split("T")[0];

  try {
    const users = await getAllUsers();
    for (const user of users) {
      const userId = user.id;
      const previousDayAttendance = await attendanceModel.getAttendanceByDate(
        userId,
        previousDateString
      );
      if (!previousDayAttendance) {
        await attendanceModel.createAttendanceAutomatically(
          userId,
          currentDateString,
          "Absent"
        );
        console.log(
          `Created attendance for user ID ${userId} on ${currentDateString} with status 'Absent'`
        );
      } else {
        console.log(
          `User ID ${userId} has attendance for ${previousDateString}`
        );
      }
    }
  } catch (err) {
    console.error("Error checking or creating attendance:", err);
  }
};

module.exports = {
  getAllEmployeeAttendance,
  getEmployeeAttendanceToday,
  createEmployeeAttendance,
  updateEmployeeAttendance,
  checkAndCreateAttendance,
};

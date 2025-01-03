const {
  sendResponse,
  failResponseServer,
  sendResponsePagination,
} = require("../utils/response.js");
const attendanceProofModel = require("../models/attendanceProof.js");

const createAttendanceProof = async (image_url, attendance_id) => {
  try {
    const [proofs] = await attendanceProofModel.createNewAttendanceProof(
      image_url,
      attendance_id
    );
    return proofs;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAttendanceProof,
};

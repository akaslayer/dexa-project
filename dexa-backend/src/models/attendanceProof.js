const dbPool = require("../config/database");

const createNewAttendanceProof = async (image_url, attendance_id) => {
  const SQLQuery =
    "INSERT INTO attendance_proof (img_proof,attendance_id) VALUES (?, ?)";
  try {
    const [results] = await dbPool.execute(SQLQuery, [
      image_url,
      attendance_id,
    ]);
    const selectQuery =
      "SELECT * FROM attendance_proof WHERE attendance_id = ?";
    return dbPool.execute(selectQuery, [attendance_id]);
  } catch (err) {
    console.error("Error inserting attendance proof:", err);
    throw err;
  }
};

module.exports = {
  createNewAttendanceProof,
};

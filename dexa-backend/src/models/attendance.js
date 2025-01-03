const dbPool = require("../config/database");

const getAllEmployeeAttendances = (limit, offset, id) => {
  const SQLQuery = `
  SELECT
  a.id,
  a.time_in,
  a.time_out,
  a.status,
  a.date,
  GROUP_CONCAT(
    CONCAT(
      '{ "proof_id": ', ap.id, ', "img_proof": "', ap.img_proof, '" }'
    )
    ORDER BY ap.id ASC
    SEPARATOR ', '
  ) AS proofs
  FROM
  attendance a
  LEFT JOIN
  attendance_proof ap ON a.id = ap.attendance_id
  WHERE a.user_id = ${id}
  GROUP BY
  a.id, a.time_in, a.date, a.time_out, a.status
  LIMIT ${limit} OFFSET ${offset}
  `;
  return dbPool.execute(SQLQuery);
};

const getEmployeeAttendanceCount = (id) => {
  const SQLQuery = `SELECT COUNT(*) as count FROM attendance WHERE user_id = ${id}`;
  return dbPool.execute(SQLQuery);
};

const getEmployeeAttendanceToday = (id, todayDate) => {
  const SQLQuery = `SELECT * FROM attendance WHERE user_id = ${id} AND DATE(date) = '${todayDate}'`;
  return dbPool.execute(SQLQuery).then(([rows]) => rows[0]);
};

const createNewEmployeeAttendance = async (id, startTime, attendanceDate) => {
  const SQLQuery =
    "INSERT INTO attendance (date, time_in,status,user_id) VALUES (?, ?, ?, ?)";
  try {
    const [results] = await dbPool.execute(SQLQuery, [
      attendanceDate,
      startTime,
      "Pending",
      id,
    ]);
    const insertedId = results.insertId;
    const selectQuery = "SELECT * FROM attendance WHERE id = ?";
    const [rows] = await dbPool.execute(selectQuery, [insertedId]);
    return rows[0];
  } catch (err) {
    console.error("Error inserting attendance:", err);
    throw err;
  }
};

const updateEmployeeAttendance = async (id, attendanceDate, endTime) => {
  console.log(attendanceDate);
  const SQLQuery =
    'UPDATE attendance SET time_out = ?, status = "Complete" WHERE date = ? AND user_id = ?';
  try {
    await dbPool.execute(SQLQuery, [endTime, attendanceDate, id]);

    const selectQuery =
      "SELECT * FROM attendance WHERE date = ? AND user_id = ?";
    const [rows] = await dbPool.execute(selectQuery, [attendanceDate, id]);
    return rows[0];
  } catch (err) {
    console.error("Error updating attendance:", err);
    throw err;
  }
};

const getAttendanceByDate = async (userId, date) => {
  const [rows] = await dbPool.execute(
    "SELECT * FROM attendance WHERE user_id = ? AND date = ?",
    [userId, date]
  );
  return rows.length > 0 ? rows[0] : null;
};

const createAttendanceAutomatically = async (
  userId,
  date,
  status = "Absent"
) => {
  const SQLQuery =
    "INSERT INTO attendance (user_id, date, status) VALUES (?, ?, ?)";
  const [result] = await dbPool.execute(SQLQuery, [userId, date, status]);
  return {
    id: result.insertId,
    user_id: userId,
    date: date,
    status: status,
  };
};

module.exports = {
  getAllEmployeeAttendances,
  getEmployeeAttendanceCount,
  getEmployeeAttendanceToday,
  createNewEmployeeAttendance,
  updateEmployeeAttendance,
  getAttendanceByDate,
  createAttendanceAutomatically,
};

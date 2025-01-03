const dbPool = require("../config/database");
const { failResponseServer } = require("../utils/response");

const getAllEmployees = (limit, offset) => {
  const SQLQuery = `SELECT * from users WHERE role = 'Employee' LIMIT ${limit} OFFSET ${offset}`;
  return dbPool.execute(SQLQuery);
};

const getEmployeeProfile = (userId) => {
  const SQLQuery = `SELECT u.id, u.code, u.email, u.name, u.role from users u WHERE u.id = ? LIMIT 1`;
  return dbPool.execute(SQLQuery, [userId]);
};

const createNewEmployee = (body) => {
  const SQLQuery =
    "INSERT INTO users (name, email, password, role, code) VALUES (?, ?, ?, ?, ?)";
  return dbPool.execute(SQLQuery, [
    body.name,
    body.email,
    body.password,
    "Employee",
    body.code,
  ]);
};

const getEmployeeCount = (role) => {
  const SQLQuery = `SELECT COUNT(*) as count FROM users WHERE role = ?`;
  return dbPool.execute(SQLQuery, [role]);
};

const updateEmployee = async (user_id, name) => {
  const SQLQuery = "UPDATE users SET name = ? WHERE id = ?";
  try {
    const [updateResults] = await dbPool.execute(SQLQuery, [name, user_id]);
    if (updateResults.affectedRows > 0) {
      const selectQuery = "SELECT * FROM users WHERE id = ?";
      const [rows] = await dbPool.execute(selectQuery, [user_id]);
      return rows[0];
    } else {
      throw new Error("No user found with the provided id");
    }
  } catch (err) {
    console.error("Error updating employee:", err);
    throw err;
  }
};

const getUserByEmail = async (email) => {
  const SQLQuery = "SELECT * FROM users WHERE email = ?";
  try {
    const [rows] = await dbPool.execute(SQLQuery, [email]);
    if (rows.length > 0) {
      return rows[0];
    }
  } catch (err) {
    console.error("Error fetching user by email:", err);
    throw err;
  }
};

const getAllUsers = async () => {
  const SQLQuery = `SELECT * from users WHERE role = 'Employee'`;
  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  getEmployeeCount,
  getEmployeeProfile,
  updateEmployee,
  getUserByEmail,
  getAllUsers,
};

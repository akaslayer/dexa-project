const {sendResponse,failResponseServer, sendResponsePagination} = require('../utils/response.js');
const usersModel = require('../models/users.js')
const bcrypt = require('bcrypt');

const getAllEmployee = async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 5;  
        const offset = (page - 1) * limit;
        const [employees] = await usersModel.getAllEmployees(limit,offset);
        const [totalCountResult] = await usersModel.getEmployeeCount('Employee');
        const totalData = totalCountResult[0].count;
        const totalPages = Math.ceil(totalData / limit);
        res.status(200).json(sendResponsePagination(200,"All employee data has been fetched",employees,totalPages,totalData,page));
    }catch(error){
        res.json(failResponseServer(500,"Error fetching employee data",error))
    }
}


const getAllUsers = async () => {
    const [users] = await usersModel.getAllUsers();
    return users;
}


const getEmployeeProfile = async (req, res) => {
    try{
        const userId =  req.user.userId; 
        const [employee] = await usersModel.getEmployeeProfile(userId);
        const result = employee[0];
        res.status(200).json(sendResponse(200,"Employee profile data has been fetched",result));
    }catch(error){
        res.json(failResponseServer(500,"Error fetching employee profile data",error))
    }
}


const getEmployeeById = async (userId) => {
    try{
        const [employee] = await usersModel.getEmployeeProfile(userId);
        return employee[0];
    }catch(error){
        res.json(failResponseServer(500,"Error fetching employee with user id " + userId,error))
    }
}



const createNewEmployee = async (req, res) => {
    try {
        const { name, email, password,confirmPassword } = req.body;
        if (!name || !email || !password || !confirmPassword ) {
            return res.status(400).json(failResponseServer(400, "All fields are required"));
        }

        if(password != confirmPassword){
            return res.status(400).json(failResponseServer(400, "Password don't match"));
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

        let codeResult = '';
        const charactersLength = characters.length;
        for ( let i = 0; i < 6; i++ ) {
            codeResult += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        await usersModel.createNewEmployee({
            name,
            email,
            password: hashedPassword,
            code:codeResult,
        });
        const result = {
            name:name,
            email:email,
            password:hashedPassword,
            role:"Employee",
            code:codeResult
        }
        res.status(201).json(sendResponse(201, "Employee created successfully", result));
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json(failResponseServer(409, "Email already exists", error));
        }
        res.status(500).json(failResponseServer(500, "Error creating employee", error));
    }
};


const updateEmployee = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email ) {
            return res.status(400).json(failResponseServer(400, "All fields are required"));
        }
        const user = await getUserByEmail(email);
        console.log(user)
        const updatedUser = await usersModel.updateEmployee(
            user.id,
            name,
        );
        const result = {
            name:updatedUser.name,
            email:updatedUser.email,
            role:"Employee",
            code:updatedUser.code
        }
        res.status(200).json(sendResponse(201, "Employee data updated successfully", result));
    } catch (error) {
        res.status(500).json(failResponseServer(500, "Error updating employee", error));
    }
};


const getUserByEmail = async (email) => {
    const result = await usersModel.getUserByEmail(email);
    return result
};



module.exports = {
    getAllEmployee,
    createNewEmployee,
    getEmployeeProfile,
    updateEmployee,
    getUserByEmail,
    getAllUsers,
    getEmployeeById
}
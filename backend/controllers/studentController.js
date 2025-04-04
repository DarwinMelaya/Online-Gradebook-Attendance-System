const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const StudentInfo = require("../models/StudentInfo");

const createStudent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      username,
      email,
      password,
      studentId,
      studentName,
      address: { barangay, municipality, province },
      guardian,
    } = req.body;

    let existingStudentInfo = await StudentInfo.findOne({ studentId });
    if (existingStudentInfo) {
      return res.status(400).json({ message: "Student ID already exists" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      username,
      email,
      password,
      role: "student",
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const studentInfo = new StudentInfo({
      user: user._id,
      studentId,
      studentName,
      address: {
        barangay,
        municipality,
        province,
      },
      guardian,
    });

    await studentInfo.save();

    res.status(201).json({
      message: "Student created successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      studentInfo: {
        studentId: studentInfo.studentId,
        studentName: studentInfo.studentName,
        address: studentInfo.address,
        guardian: studentInfo.guardian,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await StudentInfo.find().populate("user", "-password");
    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getStudentById = async (req, res) => {
  try {
    const studentInfo = await StudentInfo.findOne({
      user: req.params.userId,
    }).populate("user", "-password");

    if (!studentInfo) {
      return res.status(404).json({ message: "Student information not found" });
    }

    res.json(studentInfo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
};

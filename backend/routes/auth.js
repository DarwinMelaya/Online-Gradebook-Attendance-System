const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { auth, checkRole } = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("../controllers/authController");
const {
  createUser,
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require("../controllers/adminController");
const {
  createStudent,
  getAllStudents,
  getStudentById,
} = require("../controllers/studentController");

// Auth routes
router.post(
  "/register",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("role", "Invalid role").isIn(["admin", "teacher", "student"]),
  ],
  registerUser
);

router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  loginUser
);

router.get("/me", auth, getCurrentUser);

// Admin routes
router.post(
  "/admin/create-user",
  [
    auth,
    checkRole(["admin"]),
    check("username", "Username is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("role", "Invalid role").isIn(["admin", "teacher", "student"]),
  ],
  createUser
);

router.get("/admin/users", [auth, checkRole(["admin"])], getAllUsers);
router.put(
  "/admin/users/:userId/role",
  [auth, checkRole(["admin"])],
  updateUserRole
);
router.delete("/admin/users/:userId", [auth, checkRole(["admin"])], deleteUser);

// Teacher routes
router.post(
  "/teacher/create-student",
  [
    auth,
    checkRole(["teacher"]),
    check("username", "Username is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("studentId", "Student ID is required").not().isEmpty(),
    check("studentName", "Student name is required").not().isEmpty(),
    check("guardian.name", "Guardian name is required").not().isEmpty(),
    check("guardian.contactNumber", "Guardian contact number is required")
      .not()
      .isEmpty(),
  ],
  createStudent
);

router.get("/teacher/students", [auth, checkRole(["teacher"])], getAllStudents);
router.get(
  "/teacher/students/:userId",
  [auth, checkRole(["teacher", "admin"])],
  getStudentById
);

module.exports = router;

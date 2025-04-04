import { Toaster } from "react-hot-toast";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import AddUser from "./pages/admin/AddUser";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/auth/Login";
import AddStudents from "./pages/teacher/AddStudents";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public route */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        {/* Protected route */}
        {/* FOR ADMIND */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-user"
          element={
            <ProtectedRoute>
              <AddUser />
            </ProtectedRoute>
          }
        />

        {/* FOR TEACHER */}
        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/add-students"
          element={
            <ProtectedRoute>
              <AddStudents />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

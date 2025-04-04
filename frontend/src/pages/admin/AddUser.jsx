import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AddUserModal from "../../components/admin/modals/AddUserModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import DeleteUserModal from "../../components/admin/modals/DeleteUserModal";

const AddUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRole, setEditingRole] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, user: null });

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/auth/admin/users", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      setUsers(response.data);
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleUpdate = async (userId, newRole) => {
    try {
      await axios.put(
        `/api/auth/admin/users/${userId}/role`,
        { role: newRole },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      toast.success("Role updated successfully");
      fetchUsers(); // Refresh the users list
      setEditingRole(null);
    } catch (error) {
      toast.error("Failed to update role");
      console.error("Error updating role:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/auth/admin/users/${userId}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });

      toast.success("User deleted successfully");
      fetchUsers(); // Refresh the users list
      setDeleteModal({ isOpen: false, user: null });
    } catch (error) {
      toast.error("Failed to delete user");
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Function to get role badge color
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "teacher":
        return "bg-blue-100 text-blue-800";
      case "student":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900">
                  Users Management
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your system users and their roles
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-black focus:ring-offset-2 transform transition-all duration-200 ease-in-out hover:scale-[1.02]"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add New User
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Registered Users
              </h2>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
              </div>
            ) : (
              <div className="mt-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created At
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {user.username}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {editingRole === user._id ? (
                              <select
                                className="block w-32 px-3 py-1.5 text-xs font-medium rounded-full border-0 ring-1 ring-inset ring-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
                                defaultValue={user.role}
                                onBlur={(e) =>
                                  handleRoleUpdate(user._id, e.target.value)
                                }
                                onChange={(e) =>
                                  handleRoleUpdate(user._id, e.target.value)
                                }
                                autoFocus
                              >
                                <option value="admin" className="font-medium">
                                  admin
                                </option>
                                <option value="teacher" className="font-medium">
                                  teacher
                                </option>
                                <option value="student" className="font-medium">
                                  student
                                </option>
                              </select>
                            ) : (
                              <span
                                className={`px-3 py-1.5 inline-flex text-xs font-medium rounded-full ${getRoleBadgeColor(
                                  user.role
                                )} cursor-pointer hover:opacity-75 transition-opacity duration-200`}
                                onClick={() => setEditingRole(user._id)}
                              >
                                {user.role}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(user.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() =>
                                setDeleteModal({ isOpen: true, user })
                              }
                              className="text-red-600 hover:text-red-900 transition-colors duration-200"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        <AddUserModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            fetchUsers(); // Refresh the users list after adding a new user
          }}
        />

        <DeleteUserModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, user: null })}
          onConfirm={() => handleDeleteUser(deleteModal.user?._id)}
          username={deleteModal.user?.username}
        />
      </div>
    </Layout>
  );
};

export default AddUser;

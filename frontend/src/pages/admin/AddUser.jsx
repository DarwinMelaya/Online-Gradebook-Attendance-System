import { useState } from "react";
import Layout from "../../components/layout/Layout";
import AddUserModal from "../../components/admin/modals/AddUserModal";

const AddUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

            {/* Placeholder for users list */}
            <div className="mt-4 text-gray-500 text-sm">
              Users list will be displayed here...
            </div>
          </div>
        </div>

        <AddUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </Layout>
  );
};

export default AddUser;

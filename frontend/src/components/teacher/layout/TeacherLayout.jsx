import TeacherNavbar from "./TeacherNavbar";
import TeacherSidebar from "./TeacherSidebar";

const TeacherLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <TeacherNavbar />
      <div className="flex flex-1 overflow-hidden">
        <TeacherSidebar />
        <main className="flex-1 overflow-auto p-6">
          <div className="container mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;

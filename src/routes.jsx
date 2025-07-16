import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./layouts/AdminLayout";
import TeacherLayout from "./layouts/TeacherLayout";
import StudentLayout from "./layouts/StudentLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import TeacherDashboard from "./pages/teacher/Dashboard";
import StudentDashboard from "./pages/student/Dashboard";
import AuthWrapper from "./components/AuthWrapper";
import RegisterStudent from "./pages/admin/StudentRegister";
import RegisterTeacher from "./pages/admin/TeacherRegister";
import Students from "./pages/admin/ListofStudents";
import Teachers from "./pages/admin/ListofTeachers";

const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    {
        path: "/admin",
        element: (
            <AuthWrapper allowedRole="admin">
                <AdminLayout />
            </AuthWrapper>
        ),
        children: [
            { index: true, element: <AdminDashboard /> },
            { path: "register-student", element: <RegisterStudent /> },
            { path: "register-teacher", element: <RegisterTeacher /> },
            { path: "list-students", element: <Students /> },
            { path: "list-teachers", element: <Teachers /> },
        ]
    },
    {
        path: "/teacher",
        element: (
            <AuthWrapper allowedRole="teacher">
                <TeacherLayout />
            </AuthWrapper>
        ),
        children: [
            { index: true, element: <TeacherDashboard /> },
        ],
    },
    {
        path: "/student",
        element: (
            <AuthWrapper allowedRole="student">
                <StudentLayout />
            </AuthWrapper>
        ),
        children: [
            { index: true, element: <StudentDashboard /> },
        ],
    },

    { path: "*", element: <Login /> },
]);
export default router;
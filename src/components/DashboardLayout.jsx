import {
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Box,
    CssBaseline,
    IconButton
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { getStoredUser, isAdmin } from "../utils/auth";
import { useState } from "react";
import { logout } from "../utils/auth";

const drawerWidth = 240;

const menuItemsByRole = {
    admin: [
        { label: "Dashboard", path: "/admin" },
        { label: "Register Students", path: "/admin/register-student" },
        { label: "Register Teacher", path: "/admin/register-teacher" },
        { label: "List Students", path: "/admin/list-students" },
        { label: "List Teachers", path: "/admin/list-teachers" },
        { label: "Import students through csv", path: "/admin/import-csv" }
    ],
    teacher: [
        { label: "Dashboard", path: "/teacher" },
        { label: "List Assigned Students", path: "/teacher/assigned-students" },
        { label: "Create exam", path: "/teacher/create-exam" },
    ],
    student: [
        { label: "Dashboard", path: "/student" },
        { label: "List exams", path: "/student/list-exams" },
    ],
};

export default function DashboardLayout({ children }) {
    const navigate = useNavigate()
    const handleLogout = () => {
        logout();
        navigate("/login");
    }
    const [open, setOpen] = useState(false);
    const authData = getStoredUser();
    const user = authData?.user;
    const role = isAdmin() ? "admin" : user?.role;
    const menuItems = menuItemsByRole[role] || [];

    const toggleDrawer = () => setOpen(!open);

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            <AppBar
                position="fixed"
                sx={{
                    zIndex: 1300,
                    ml: open ? `${drawerWidth}px` : 0,
                    transition: "margin 0.3s ease",
                    bgcolor: "#9ECAD6",
                    color: "black",
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={toggleDrawer}
                        sx={{ mr: 2 }}
                    >
                        {open ? <ChevronLeftIcon /> : <MenuIcon />}
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        School Management System
                    </Typography>
                </Toolbar>
            </AppBar>


            <Drawer
                variant="persistent"
                open={open}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        transition: "width 0.3s ease",
                        bgcolor: "#748DAE",
                        color: "white",
                    },

                }}
            >
                <Toolbar />
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.path} disablePadding>
                            <ListItemButton component={NavLink} to={item.path}>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleLogout}>
                            <LogoutIcon sx={{ mr: 1 }} />
                            <ListItemText primary="Logout"></ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>


            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    ml: open ? `${drawerWidth}px` : 0,
                    transition: "margin 0.3s ease",
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}

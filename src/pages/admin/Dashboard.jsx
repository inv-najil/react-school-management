import { Button, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Welcome Admin
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("register-student")}
        >
          Register Student
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("register-teacher")}
        >
          Register Teacher
        </Button>
      </Stack>
    </>
  );
}

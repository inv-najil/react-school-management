import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { registerAPI } from "../../api/authService";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function RegisterStudent() {
  const { register, handleSubmit, formState: { errors },watch } = useForm();
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();
  const password = watch("password")


  useEffect(() => {
    API.get("/teachers/")
      .then((res) => {
        setTeachers(res.data.results);
      })
      .catch((err) => {
        console.error("Failed to fetch teachers:", err);
        setTeachers([]);
      });
  }, []);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        role: "student",
      };
      await registerAPI(payload);
      alert("Student registered successfully");
      navigate("/admin");
    } catch (err) {
      alert("Failed to register student");
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Register Student
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField fullWidth label="Username" {...register("username", { required: "Username is required" })} margin="normal" />
          <TextField fullWidth label="Email" {...register("email", { required: "email is required", pattern:{
            value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
            message:"Invalid Formate"
          } })} margin="normal" />
          <TextField fullWidth label="Phone" {...register("phone", { required: "Phone number is required", maxLength:{
            value : 10,
            message: "Phone Number must to 10 characters"
          } })} margin="normal" />
          <TextField fullWidth label="First Name" {...register("first_name")} margin="normal" />
          <TextField fullWidth label="Last Name" {...register("last_name")} margin="normal" />
          <TextField fullWidth label="Password" type="password" {...register("password", { required: "Password is required", minLength:{
            value : 8,
            message : "Password must be 8 characters long"
          } })} margin="normal" />
          <TextField fullWidth label="Confirm Password" type="password" {...register("password2", { required: "Please confirm password", validate: (val)=>{
            val === password || "Passwords must match"
          } })} margin="normal" />

          <TextField fullWidth label="Roll No" {...register("roll_no")} margin="normal" />
          <TextField fullWidth label="Grade" {...register("grade")} margin="normal" />
          <TextField fullWidth label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} {...register("dob")} margin="normal" />
          <TextField fullWidth label="Admission Date" type="date" InputLabelProps={{ shrink: true }} {...register("admission_date")} margin="normal" />

          <TextField
            select
            fullWidth
            label="Assigned Teacher"
            {...register("assigned_teacher")}
            margin="normal"
          >
            {teachers.map((teacher) => (
              <MenuItem key={teacher.id} value={teacher.id}>
                {teacher.user?.username || teacher.employee_id}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            label="Status"
            {...register("status")}
            margin="normal"
            defaultValue="active"
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Register Student
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

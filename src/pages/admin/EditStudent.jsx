import {
  Container, TextField, Button, Typography, Paper, MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditStudent() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    API.get(`/students/${id}/`)
      .then((res) => reset(res.data))
      .catch((err) => console.error("Error fetching student:", err));
    API.get("/teachers/")
      .then((res) => setTeachers(res.data.results))
      .catch((err) => console.error("Error fetching teachers:", err));
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await API.put(`/students/${id}/`, data);
      alert("Student updated successfully");
      navigate("/admin");
    } catch (err) {
      alert("Failed to update student");
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 6 }}>
        <Typography variant="h5" gutterBottom>Edit Student</Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField fullWidth label="email" InputLabelProps={{ shrink: true }} {...register("email", {
            required: "email is required", pattern: {
              value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
              message: "Invalid Formate"
            }
          })}
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal" />
          <TextField fullWidth label="Phone" InputLabelProps={{ shrink: true }}  {...register("phone", {
            required: "Phone number is required", pattern: {
              value: /^[0-9]{10}$/,
              message: "Phone number must be exactly 10 digits"
            }
          })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            margin="normal" />
          <TextField fullWidth label="first name" InputLabelProps={{ shrink: true }}  {...register("first_name")} margin="normal" />
          <TextField fullWidth label="last name" InputLabelProps={{ shrink: true }}  {...register("last_name")} margin="normal" />
          <TextField select fullWidth label="Assigned Teacher" {...register("assigned_teacher")} margin="normal">
            {teachers.map((teacher) => (
              <MenuItem key={teacher.id} value={teacher.id}>
                {`${teacher.first_name} - ${teacher.employee_id}`}
              </MenuItem>
            ))}
          </TextField>
          <TextField select fullWidth label="Status" {...register("status")} margin="normal">
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Update Student
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

import {
    Container,
    TextField,
    Typography,
    Paper,
    MenuItem,
    Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { registerAPI } from "../../api/authService";
import { useNavigate } from "react-router-dom";

const statusOptions = ["active", "inactive"];

export default function RegisterTeacher() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();
    const password = watch(password)
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const payload = {
                ...data,
                role: "teacher",
            };
            await registerAPI(payload);
            alert("Teacher registered successfully");
            navigate("/admin");
        } catch (err) {
            alert("Failed to register teacher");
            console.error(err);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper sx={{ p: 4, mt: 6 }}>
                <Typography variant="h5" gutterBottom>
                    Register Teacher
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextField
                        fullWidth
                        label="Username"
                        {...register("username", { required: "Username is required" })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        {...register("email", {
                            required: "Email is required", pattern: {
                                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                message: "Invalid formate"
                            }
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Phone"
                        {...register("phone", {
                            required: "Phone is required", maxLength: {
                                value: 10,
                                message: "Phone number must be 10"
                            }
                        })}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="First Name"
                        {...register("first_name")}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        {...register("last_name")}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        {...register("password", {
                            required: "Password is required", minLength: {
                                value: 8,
                                message: "Password must be 8 characters"
                            }
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        {...register("password2", { required: "Please confirm password", validate: (val) => val === password || "Passwords Must Match" })}
                        error={!!errors.password2}
                        helperText={errors.password2?.message}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Subject Specialization"
                        {...register("subject_spl")}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Employee ID"
                        {...register("employee_id")}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Date of Joining"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        {...register("date_of_joining")}
                        margin="normal"
                    />
                    <TextField
                        select
                        fullWidth
                        label="Status"
                        {...register("status")}
                        margin="normal"
                    >
                        {statusOptions.map((status) => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                        Register Teacher
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

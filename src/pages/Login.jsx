import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Container, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../api/authService";
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice";


export default function Login() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (formData) => {
        try {
            const response = await loginAPI(formData);
            dispatch(login(response.data));

            const { is_superuser, role } = response.data.user;
            navigate(is_superuser ? "/admin" : `/${role}`);
        } catch (err) {
            alert("Invalid username or password");
        }
    }

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        label="Username"
                        margin="normal"
                        {...register("username", { required: "Username is required" })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        {...register("password", { required: "Password is required" })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

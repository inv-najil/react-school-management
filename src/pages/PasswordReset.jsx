import { useState } from "react";
import { Container, Typography, TextField, Button, Paper } from "@mui/material";
import { resetPasswordApi } from "../api/authService";

export default function ResetPassword() {
    const [email, Setemail] = useState('');
    const [message, Setmessage] = useState('');
    const [error, Seterror] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await resetPasswordApi(email);
            Setmessage(res?.message || 'password reset mail sent');
            Seterror('');
        }
        catch (err) {
            Setmessage('');
            Seterror(err.res?.data?.error || "Somting went wrong");
        }
    }
    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: '2rem', marginTop: '2rem' }}>
                <Typography variant="h5" gutterBottom>Reset Password</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        value={email}
                        onChange={(e) => Setemail(e.target.value)}
                        margin="normal"
                        type="email"
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Send Reset Link
                    </Button>
                </form>
                {message && <Typography color="success.main" sx={{ mt: 2 }}>{message}</Typography>}
                {error && <Typography color="error.main" sx={{ mt: 2 }}>{error}</Typography>}
            </Paper>
        </Container>
    )
}
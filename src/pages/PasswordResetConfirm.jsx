import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { resetPasswordConfirmApi } from "../api/authService";
export default function ResetPasswordConfirm() {
    const { uidb64, token } = useParams();
    const navigate = useNavigate();
    const [newpassword, Setnewpassword] = useState('');
    const [message, Setmessage] = useState('');
    const [error, Seterror] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await resetPasswordConfirmApi({
                uid: uidb64,
                token,
                new_password: newpassword,
            })
            console.log(res);
            Setmessage(res.message || "password reset sucessful");
            Seterror('')
            setTimeout(() => navigate('/login'), 3000);
        }
        catch (err) {
            Seterror(err.response?.data?.error || "Failed. Link may be invalid or expired.");
        }
    };
    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: '2rem', marginTop: '2rem' }}>
                <Typography variant="h5" gutterBottom>
                    Reset your password
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                    label="New Password"
                    fullWidth
                    value={newpassword}
                    type="password"
                    onChange={(e)=>Setnewpassword(e.target.value)}
                    margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Reset
                    </Button>
                </form>
                {message && <Typography color="success.main" sx={{ mt: 2 }}>{message}</Typography>}
                {error && <Typography color="error.main" sx={{ mt: 2 }}>{error}</Typography>}
            </Paper>
        </Container>
    )

}
import { useEffect, useState } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import { fetchAllExams } from "../../api/authService";
import { useNavigate } from "react-router-dom";
export default function ExamList() {
    const navigate = useNavigate();
    const [exams, Setexams] = useState([]);

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const res = await fetchAllExams();
                Setexams(res.data.results);
            }
            catch (err) {
                console.error(err);
            }
        };
        fetchExam();
    }, []);
    return (
        <Box p={2}>
            <Typography variant="h4" gutterBottom>Available Exams</Typography>
            {exams.map((exam) => (
                <Paper key={exam.id} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h6">{exam.title}</Typography>
                    <Typography>Duration: {exam.duration} minutes</Typography>
                    <Button variant="contained" onClick={() => navigate(`/student/exams/${exam.id}`)} sx={{ mt: 1 }}>
                        Take Exam
                    </Button>
                </Paper>
            ))}
        </Box>
    );
}
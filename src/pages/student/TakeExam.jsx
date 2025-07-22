import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchExamQuestions, submitExam } from "../../api/authService";
import {
    Box,
    Typography,
    RadioGroup,
    Radio,
    FormControlLabel,
    Button,
    Paper,
} from "@mui/material";

export default function TakeExam() {
    const { examId } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [duration, setDuration] = useState(0);
    const [timeleft, setTimeleft] = useState(0);

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const res = await fetchExamQuestions(examId);
                console.log(res)
                setQuestions(res.data.questions);
                const fetchedDuration = res.data.duration;
                setDuration(fetchedDuration)
                const startTime = new Date();
                const endTime = new Date(startTime.getTime() + fetchedDuration * 60000);
                const diff = Math.floor((endTime - startTime) / 1000);
                setTimeleft(diff);
            } catch (err) {
                console.error("Failed to fetch questions", err);
            }
        };
        getQuestions();
    }, [examId]);

    useEffect(() => {
        if (timeleft <= 0) return;
        const timer = setInterval(() => {
            setTimeleft((prev) => (prev - 1))
        }, 1000)
        return () => clearInterval(timer);
    }, [timeleft])

    const formateTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    }

    const handleChange = (questionId, selected) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: selected,
        }));
    };

    const handleSubmit = async () => {
        const payload = {
            exam: parseInt(examId),
            answers: questions.map((q) => ({
                question: q.id,
                selected_answer: answers[q.id] || null,
            })),
        };
        try {
            const res = await submitExam(examId, payload);
            const { message, score } = res.data
            alert(`${message} your score is ${score}`);
            setTimeout(() => {
                navigate("/student/list-exams");
            }, 1000);

        } catch (err) {
            console.error("Submission error", err);
            const errorMessage = err?.response?.data?.Error || "Failed to sumbit"
            alert(errorMessage)
        }
    };

    return (
        <Box p={2}>
            <Typography variant="h4" gutterBottom>
                Take Exam
            </Typography>

            <Typography variant="h6" color="error" gutterBottom>
                Time Left: {formateTime(timeleft)}
            </Typography>


            {questions.map((q, index) => (
                <Paper key={q.id} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h6">
                        {index + 1}. {q.question_text}
                    </Typography>
                    <RadioGroup
                        value={answers[q.id] || ""}
                        onChange={(e) => handleChange(q.id, e.target.value)}
                    >
                        <FormControlLabel value="A" control={<Radio />} label={q.option_A} />
                        <FormControlLabel value="B" control={<Radio />} label={q.option_B} />
                        <FormControlLabel value="C" control={<Radio />} label={q.option_C} />
                        <FormControlLabel value="D" control={<Radio />} label={q.option_D} />
                    </RadioGroup>
                </Paper>
            ))}

            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={timeleft <= 0}>
                Submit Exam
            </Button>
        </Box>
    );
}

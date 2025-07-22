import { useState } from "react";
import { Container, TextField, Typography, Paper, Box, MenuItem, Button } from "@mui/material";
import { examCreation, addQuestions } from "../../api/authService";
import { useForm } from "react-hook-form";
const options = ['A', 'B', 'C', 'D'];
export default function CreateExam() {
    const [examId, Setexamid] = useState(null);
    const [questionIndex, Setquestionindex] = useState(0);
    const [createdQuestions, Setcreatedquestions] = useState([]);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const createExam = async (data) => {
        try {
            const res = await examCreation(data);
            Setexamid(res.data.id);
        }
        catch (err) {
            console.error(err);
        }
    };

    const addQuestion = async (data) => {
        const updatedQuestions = [...createdQuestions, data];
        Setcreatedquestions(updatedQuestions);
        reset();
        if (questionIndex < 4) {
            Setquestionindex(questionIndex + 1);
        } else {
            try {
                await addQuestions(examId, updatedQuestions); 
                alert("All 5 questions added successfully!");
            } catch (err) {
                console.error("Failed to submit all questions", err);
            }
        }
    };
    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
                {!examId ? (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Create Exam
                        </Typography>
                        <form onSubmit={handleSubmit(createExam)}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Exam Title"
                                {...register("title", { required: "Exam title is required" })}
                                error={!!errors.title}
                                helperText={errors.title?.message}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Duration (minutes)"
                                {...register("duration", {
                                    required: "Exam duration is required",
                                })}
                                error={!!errors.duration}
                                helperText={errors.duration?.message}
                            />
                            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                                Create Exam
                            </Button>
                        </form>
                    </>
                ) : (
                    <>
                        <Typography variant="h6">
                            Add Question {questionIndex + 1} of 5
                        </Typography>
                        <form onSubmit={handleSubmit(addQuestion)}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Question"
                                {...register("question_text", { required: "Required" })}
                                error={!!errors.question_text}
                                helperText={errors.question_text?.message}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Option A"
                                {...register("option_A", { required: "Required" })}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Option B"
                                {...register("option_B", { required: "Required" })}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Option C"
                                {...register("option_C", { required: "Required" })}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Option D"
                                {...register("option_D", { required: "Required" })}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Correct Answer"
                                select
                                {...register("correct_answer", {
                                    required: "Option is required",
                                })}
                            >
                                {["A", "B", "C", "D"].map((opt) => (
                                    <MenuItem key={opt} value={opt}>
                                        {opt}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={createdQuestions.length >= 5}
                                sx={{ mt: 2 }}
                            >
                                Add Question
                            </Button>
                        </form>
                    </>
                )}
            </Paper>
        </Container>
    );
}
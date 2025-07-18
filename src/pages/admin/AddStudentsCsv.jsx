import { useState } from "react";
import { Typography, Container, Button, Box } from "@mui/material";
import { importStudentsCSV } from "../../api/authService";
export default function ImportCsv() {
    const [file, Setfile] = useState(null);
    const [message, Setmessage] = useState('');
    const [error, Seterror] = useState('');
    const handleFilechange = (e) => {
        Setfile(e.target.files[0]);
    };
    const handleUpload = async () => {
        if (!file) {
            Seterror("Please upload a file");
            return
        }
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await importStudentsCSV(formData);
            Setmessage(`Uploaded ${response.data.sucessfully_created} students`);
            Seterror('');
        } catch (err) {
            Seterror("Upload failed");
            console.error(err);
        }
    };
    return (
        <Container maxWidth="sm">
            <Box mt={4} display={"flex"} flexDirection={"column"} gap={2}>
                <Typography variant="h5">Upload students via csv</Typography>
                <input
                    type="file"
                    accept=".csv"
                    id="csv-upload"
                    onChange={handleFilechange}
                />
                <label htmlFor="csv-upload">
                    <Button variant="outlines" component="span">
                        Choose CSV file
                    </Button>
                    {file && <Typography>{file.name}</Typography>}
                </label>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    disabled={!file}
                >
                    Upload
                </Button>
                {message && <Typography color="success.main">{message}</Typography>}
                {error && <Typography color="error.main">{error}</Typography>}
            </Box>
        </Container>
    )
}
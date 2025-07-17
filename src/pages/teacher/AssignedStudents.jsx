import { useState, useEffect } from "react";
import { assingnedStudentApi } from "../../api/authService";
import { Table, TableContainer, TableHead, TableRow, TableCell, Paper, TableBody } from "@mui/material";
export default function AssignedStudents() {
    const [students, setStudent] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await assingnedStudentApi();
                console.log("students response", response?.data);
                setStudent(response.data);
            } catch (err) {
                console.error("could not get students", err);
            }
        }
        fetchData();
    }, [])
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Name</strong></TableCell>
                        <TableCell><strong>Roll Number</strong></TableCell>
                        <TableCell><strong>Email</strong></TableCell>
                        <TableCell><strong>Phone</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((student) => (
                        <TableRow key={student.id}>
                            <TableCell>{student.first_name} {student.last_name}</TableCell>
                            <TableCell>{student.roll_no}</TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>{student.phone}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
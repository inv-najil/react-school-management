import { useState, useEffect } from "react";
import API from "../../api/axios";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
export default function StudentDashboard() {
  const [student, setStudent] = useState([]);
  useEffect(() => {
    API.get("/students/")
      .then((res) => {
        setStudent(res.data.results);
      })
      .catch((err) => {
        console.error("Error is fetching details", err);
        setStudent([]);
      })
  }, [])
  return (
    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Roll Number</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {student.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.first_name} {student.last_name}</TableCell>
              <TableCell>{student.roll_no}</TableCell>
              <TableCell>{student.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
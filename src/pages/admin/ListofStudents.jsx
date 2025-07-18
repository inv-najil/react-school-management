import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Pagination } from "@mui/material";
import API from "../../api/axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
export default function Students() {
    const [students, setStudent] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page")) || 1;
    const pageSize = 10;

    useEffect(() => {
        API.get(`/students/?page=${page}`)
            .then((res) => {
                setStudent(res.data.results);
                setTotalCount(res.data.count);
            })
            .catch((err) => {
                console.log("Error in getting students", err);
                setStudent([]);
            })
    }, [page]);

    const handlePageChange = (event, value) => {
        setSearchParams({ page: value });
    };
    const totalPages = Math.ceil(totalCount / pageSize)


    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Students List
            </Typography>

            <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>First Name</strong></TableCell>
                            <TableCell><strong>Last Name</strong></TableCell>
                            <TableCell><strong>Roll No</strong></TableCell>
                            <TableCell><strong>Email</strong></TableCell>
                            <TableCell><strong>Assigned Teacher</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell>{student.first_name}</TableCell>
                                <TableCell>{student.last_name}</TableCell>
                                <TableCell>{student.roll_no}</TableCell>
                                <TableCell>{student.email}</TableCell>
                                <TableCell>{student.assigned_teacher}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Box>
    );
}


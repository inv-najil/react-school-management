import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Pagination, Box } from "@mui/material";
import { useState, useEffect } from "react";
import API from "../../api/axios";
import { useSearchParams } from "react-router-dom";
export default function Teachers() {
    const [teachers, setTeachers] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page")) || 1;
    const pageSize = 10;
    useEffect(() => {
        API.get(`/teachers/?page=${page}`)
            .then((res) => {
                setTeachers(res.data.results);
                setTotalCount(res.data.count);
            })
            .catch((err) => {
                console.error("Error in Listing teachers", err);
                setTeachers([]);
            })
    }, [page]);


    const handlePageChange = (event, value) => {
        setSearchParams({ page: value });
    };
    const totalPages = Math.ceil(totalCount / pageSize);


    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Teachers List
            </Typography>
            <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>First Name</strong></TableCell>
                            <TableCell><strong>Last Name</strong></TableCell>
                            <TableCell><strong>Employee Id</strong></TableCell>
                            <TableCell><strong>Phone</strong></TableCell>
                            <TableCell><strong>Email</strong></TableCell>
                            <TableCell><strong>Subject Specialized</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teachers.map((teacher) => (
                            <TableRow key={teacher.id}>
                                <TableCell>{teacher.first_name}</TableCell>
                                <TableCell>{teacher.last_name}</TableCell>
                                <TableCell>{teacher.employee_id}</TableCell>
                                <TableCell>{teacher.phone}</TableCell>
                                <TableCell>{teacher.email}</TableCell>
                                <TableCell>{teacher.subject_spl}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box display="flex" justifyContent="center" mt={3}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Box>
    )
}
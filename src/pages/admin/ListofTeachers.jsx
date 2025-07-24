import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Pagination, Box, Tooltip, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";
import API from "../../api/axios";
import { useSearchParams, useNavigate } from "react-router-dom";
export default function Teachers() {
    const [teachers, setTeachers] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
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

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure want to delete Teacher?")
        if (!confirm) return;
        try {
            await API.delete(`/teachers/${id}/`);
            setTeachers(prev => prev.filter(t => t.id !== id));
        } catch (err) {
            console.error("Failed to delete Teacher", err);
            alert("Failed to delete Teacher. Please try again.");
        }
    };

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
                                <TableCell>
                                    <Tooltip title="Edit">
                                        <IconButton onClick={() => { navigate(`/admin/teachers/edit/${teacher.id}`) }}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton onClick={() => { handleDelete(teacher.id) }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
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
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  IconButton,
  Pagination,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import Layout from "./Layout";
import { get_classes, post_class } from "../endpoints/api";

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState({ title: "", created_at: "" });
  const [editingClass, setEditingClass] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchClasses();
  }, []);
  const fetchClasses = async () => {
    try {
      const initialClasses = await get_classes();
      setClasses(initialClasses);
    } catch (error) {
      console.error("Get classes failed:", error);
    }
  };

  const handleAddClass = async () => {
    try{
      const newClasses = await post_class(newClass?.title, newClass?.created_at);
      setClasses([...classes, newClasses]);
      setNewClass({ title: "", created_at: "" });
      fetchClasses();
    }
    catch (error) {
      console.error("Something Went Wrong:", error);
    }
  };

  const handleEditClass = (classItem) => {
    setEditingClass(classItem);
    setNewClass({ name: classItem.name, date: classItem.date });
  };

  const handleUpdateClass = () => {
    setClasses(
      classes.map((classItem) =>
        classItem.id === editingClass.id ? newClass : classItem
      )
    );
    setEditingClass(null);
    setNewClass({ name: "", date: "" });
  };

  // const handleDeleteClass = (classId) => {
  //   setClasses(classes.filter((classItem) => classItem.id !== classId));
  // };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClasses = classes.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Layout>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mb={4}
      >
        <Typography variant="h4" gutterBottom>
          Class Management
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mb={4}
          width="100%"
        >
          <TextField
            label="Class Name"
            value={newClass.title}
            onChange={(e) =>
              setNewClass({ ...newClass, title: e.target.value })
            }
            sx={{ mb: 2, width: "100%" }}
          />
          <TextField
            label="Class Date"
            type="date"
            value={newClass.created_at}
            onChange={(e) =>
              setNewClass({ ...newClass, created_at: e.target.value })
            }
            sx={{ mb: 2, width: "100%" }}
            InputLabelProps={{ shrink: true }}
          />
          {editingClass ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateClass}
              sx={{ mb: 2 }}
            >
              Update Class
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddClass}
              sx={{ mb: 2 }}
            >
              <IconButton variant="contained" color="inherit">
                <Add />
              </IconButton>
              Add Class
            </Button>
          )}
        </Box>
        <Box width="100%">
          {currentClasses.map((classItem, index) => (
            <Card key={index} variant="outlined" sx={{ mb: 2, width: "100%" }}>
              <CardContent>
                <Typography variant="h6">{classItem?.title}</Typography>
                <Typography color="textSecondary">
                  {classItem?.created_at.slice(0, 10)}
                </Typography>
                <Box display="flex" justifyContent="flex-end">
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClass(classItem)}
                  >
                    <Edit />
                  </IconButton>
                  {/* onClick={() => handleDeleteClass(classItem.id)} */}
                  <IconButton color="secondary">
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
          <Box display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(classes.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              sx={{ mt: 2 }}
            />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default ClassManagement;

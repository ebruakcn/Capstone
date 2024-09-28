import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import "../App.css";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Modal,
  Box,
} from "@mui/material";

const initialCategories = [
  {
    id: 0,
    name: "",
    description: "",
  },
];

function Category() {
  //State
  const [categories, setCategories] = useState([]);
  const [update, setUpdate] = useState(false);
  const [newCategories, setNewCategories] = useState(initialCategories);
  const [updateCategories, setUpdateCategories] = useState(initialCategories);

  // Modal state to handle error messages
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  //Data is retrieved from the API
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        setModalMessage("Failed to retrieve categories.");
        setOpenModal(true);
      });

    setUpdate(true);
  }, [update]);

  // Updates changes in the input
  const handleNewCategoriesInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategories((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Updates changes in the input
  const handleUpdateCategoriesInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateCategories((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Adds new categories to the API and updates the status on success
  const handleAddCategoriesBtn = () => {
    try {
      axios
        .post(
          import.meta.env.VITE_APP_BASE_URL + "/api/v1/categories",
          newCategories
        )
        .then(() => {
          setUpdate(false);
          setNewCategories(initialCategories);
        })
        .catch(() => {
          setModalMessage("Failed to add new category.");
          setOpenModal(true);
        });
    } catch (error) {
      setModalMessage("An unexpected error occurred.");
      setOpenModal(true);
    }
  };

  // Deletes the specified category from the API and updates the status on success
  const handleDeleteCategories = (e) => {
    try {
      axios
        .delete(
          import.meta.env.VITE_APP_BASE_URL + "/api/v1/categories/" + e.target.id
        )
        .then(() => {
          setUpdate(false);
        })
        .catch(() => {
          setModalMessage("Failed to delete category.");
          setOpenModal(true);
        });
    } catch (error) {
      setModalMessage("An unexpected error occurred.");
      setOpenModal(true);
    }
  };

  // Updates the specified category and resets the status on success
  const handleUpdateCategories = () => {
    const updatedCategory = {};

   
    if (updateCategories.name) {
      updatedCategory.name = updateCategories.name;
    }
  
    if (updateCategories.description) {
      updatedCategory.description = updateCategories.description;
    }
    try {
      axios
        .put(
          import.meta.env.VITE_APP_BASE_URL +
            "/api/v1/categories/" +
            updateCategories.id,
          updateCategories
        )
        .then(() => {
          setUpdate(false);
          setUpdateCategories(initialCategories);
        })
        .catch(() => {
          setModalMessage("Failed to update category.");
          setOpenModal(true);
        });
    } catch (error) {
      setModalMessage("An unexpected error occurred.");
      setOpenModal(true);
    }
  };

  // Sets the selected category for update status
  const handleUpdateCategoriesBtn = (category) => {
    setUpdateCategories(category);
  };

  // Modal close handler
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="container">
        <div className="category">
          {/* Form fields to add new categories */}
          <h2>Categories</h2>
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            name="name"
            value={newCategories.name || ""}
            onChange={handleNewCategoriesInputChange}
          />

          <TextField
            id="standard-basic"
            label="Description"
            variant="standard"
            name="description"
            value={newCategories.description || ""}
            onChange={handleNewCategoriesInputChange}
          />
          <Button
            id="button"
            variant="contained"
            color="primary"
            onClick={handleAddCategoriesBtn}
          >
            Save
          </Button>
        </div>
        <div className="updateCategory">
          {/* Form fields to update the current category */}
          <h2>Update Categories</h2>
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            name="name"
            value={updateCategories.name || ""}
            onChange={handleUpdateCategoriesInputChange}
          />

          <TextField
            id="standard-basic"
            label="Description"
            variant="standard"
            name="description"
            value={updateCategories.description || ""}
            onChange={handleUpdateCategoriesInputChange}
          />
          <Button
            id="button"
            variant="contained"
            color="primary"
            onClick={handleUpdateCategories}
          >
            Save
          </Button>
        </div>
      </div>

      {/*List categories */}
      <TableContainer component={Paper}>
        <Table aria-label="categories table">
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: "#317ac4" }}>
                <Typography
                  variant="h8"
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    textTransform: "uppercase",
                  }}
                >
                  Categories Name
                </Typography>
              </TableCell>
              <TableCell style={{ backgroundColor: "#317ac4" }}>
                <Typography
                  variant="h8"
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    textTransform: "uppercase",
                  }}
                >
                  Description
                </Typography>
              </TableCell>
              <TableCell align="center" style={{ backgroundColor: "#317ac4" }}>
                <Typography
                  variant="h8"
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    textTransform: "uppercase",
                  }}
                >
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={index}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>

                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateCategoriesBtn(category)}
                    style={{ marginRight: 10 }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeleteCategories}
                    id={category.id}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for error messages */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Error
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalMessage}
          </Typography>
          <Button onClick={handleCloseModal} variant="contained" color="primary">
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default Category;

import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
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
} from "@mui/material";

const initialBook = {
  name: "",
  birthDate: "",
  country: "",
};

function Authors() {
  // State
  const [authors, setAuthors] = useState([]);
  const [update, setUpdate] = useState(false);
  const [newAuthors, setNewAuthors] = useState(initialBook);
  const [updateAuthors, setUpdateAuthors] = useState(initialBook);
  const [error, setError] = useState(null); // Error state for modal

  // Data is retrieved from the API
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors")
      .then((res) => {
        setAuthors(res.data);
      })
      .catch(() => setError("Failed to load authors")); // Error handling

    setUpdate(true);
  }, [update]);

  // Updates changes in the input
  const handleNewAuthorssInputChange = (e) => {
    const { name, value } = e.target;
    setNewAuthors((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Updates changes in the input
  const handleUpdateAuthorsInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateAuthors((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Adds new authors to the API and updates the status on success
  const handleAddNewAuthorsBtn = () => {
    axios
      .post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors", newAuthors)
      .then(() => {
        setUpdate(false);
        setNewAuthors(initialBook);
      })
      .catch(() => setError("Failed to add new author")); // Error handling
  };

  // Deletes the specified author from the API and updates the status on success
  const handleDeleteAuthors = (e) => {
    axios
      .delete(import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors/" + e.target.id)
      .then(() => {
        setUpdate(false);
      })
      .catch(() => setError("Failed to delete author")); // Error handling
  };

  // Updates the specified author and resets the status on success
  const handleUpdateAuthors = () => {
    axios
      .put(
        import.meta.env.VITE_APP_BASE_URL +
          "/api/v1/authors/" +
          updateAuthors.id,
        updateAuthors
      )
      .then(() => {
        setUpdate(false);
        setUpdateAuthors(initialBook);
      })
      .catch(() => setError("Failed to update author")); // Error handling
  };

  // Sets the selected author for update status
  const handleUpdateAuthorsBtn = (author) => {
    setUpdateAuthors(author);
  };

  const handleCloseError = () => {
    setError(null); // Close modal
  };

  return (
    <>
      <div className="container">
        <div className="authors">
          {/* Form fields to add new authors */}
          <h2>Authors</h2>
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            name="name"
            value={newAuthors.name}
            onChange={handleNewAuthorssInputChange}
          />

          <TextField
            id="standard-basic"
            label="Birth Date"
            variant="standard"
            name="birthDate"
            value={newAuthors.birthDate}
            onChange={handleNewAuthorssInputChange}
            type="date"
            InputLabelProps={{
              shrink: true, 
            }}
          />

          <TextField
            id="standard-basic"
            label="Country"
            variant="standard"
            name="country"
            value={newAuthors.country}
            onChange={handleNewAuthorssInputChange}
          />

          <Button
            id="button"
            variant="contained"
            color="primary"
            onClick={handleAddNewAuthorsBtn}
          >
            Save
          </Button>
        </div>
        <div className="updateAuthors">
          {/* Form fields to update the current authors */}
          <h2>Update Authors</h2>
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            name="name"
            value={updateAuthors.name}
            onChange={handleUpdateAuthorsInputChange}
          />

          <TextField
            id="standard-basic"
            label="Birth Date"
            variant="standard"
            name="birthDate"
            value={updateAuthors.birthDate}
            onChange={handleUpdateAuthorsInputChange}
            type="date"
            InputLabelProps={{
              shrink: true, 
            }}
          />

          <TextField
            id="standard-basic"
            label="Country"
            variant="standard"
            name="country"
            value={updateAuthors.country}
            onChange={handleUpdateAuthorsInputChange}
          />

          <Button
            id="button"
            variant="contained"
            color="primary"
            onClick={handleUpdateAuthors}
          >
            Save
          </Button>
        </div>
      </div>
      {/*List categories */}
      <TableContainer component={Paper}>
        <Table aria-label="authors table">
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
                  Author Name
                </Typography>
              </TableCell>{" "}
              <TableCell style={{ backgroundColor: "#317ac4" }}>
                <Typography
                  variant="h8"
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    textTransform: "uppercase",
                  }}
                >
                  Birth Date
                </Typography>
              </TableCell>{" "}
              <TableCell style={{ backgroundColor: "#317ac4" }}>
                <Typography
                  variant="h8"
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    textTransform: "uppercase",
                  }}
                >
                  Country
                </Typography>
              </TableCell>
              <TableCell style={{ backgroundColor: "#317ac4" }} align="center">
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
            {authors?.map((author, index) => (
              <TableRow key={index}>
                <TableCell>{author.name}</TableCell>
                <TableCell>{author.birthDate}</TableCell>
                <TableCell>{author.country}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateAuthorsBtn(author)}
                    style={{ marginRight: 10 }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeleteAuthors}
                    id={author.id}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Error Modal */}
      <Dialog open={!!error} onClose={handleCloseError}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>{error}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseError} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Authors;
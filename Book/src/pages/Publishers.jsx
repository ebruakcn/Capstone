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
  Typography,
  Paper,
} from "@mui/material";

const initialBook = {
  id: 0,
  name: "",
  establishmentYear: "",
  address: "",
};

function Publishers() {
  // State
  const [publishers, setPublishers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [newPublishers, setNewPublishers] = useState(initialBook);
  const [loading, setLoading] = useState(true);
  const [updatePublishers, setUpdatePublishers] = useState(initialBook);
  const [error, setError] = useState(null); // Error state for modal

  // Data is retrieved from the API
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers")
      .then((res) => {
        setPublishers(res.data);
      })
      .catch(() => setError("Failed to load publishers")); // Error handling
    setLoading(false);
    setUpdate(true);
  }, [update]);

    // Updates changes in the input
  const handleNewPublishersInputChange = (e) => {
    const { name, value } = e.target;
    setNewPublishers((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    // Updates changes in the input
 const handleUpdatePublishersInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatePublishers((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

   // Adds new publishers to the API and updates the status on success
  const handleAddNewPublishersBtn = () => {
    axios
      .post(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers",
        newPublishers
      )
      .then(() => {
        setUpdate(false);
        setNewPublishers(initialBook);
      })
      .catch(() => setError("Failed to add new publisher")); // Error handling
  };
  
  // Deletes the specified publisher from the API and updates the status on success
  const handleDeletePublishers = (e) => {
    axios
      .delete(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers/" + e.target.id
      )
      .then(() => {
        setUpdate(false);
      })
      .catch(() => setError("Failed to delete publisher")); // Error handling
  };

    // Updates the specified publisher and resets the status on success
  const handleUpdatePublishers = () => {
    axios
      .put(
        import.meta.env.VITE_APP_BASE_URL +
          "/api/v1/publishers/" +
          updatePublishers.id,
        updatePublishers
      )
      .then(() => {
        setUpdate(false);
        setUpdatePublishers(initialBook);
      })
      .catch(() => setError("Failed to update publisher")); // Error handling
  };

  // Sets the selected publisher for update status
  const handleUpdatePublishersBtn = (doc) => {
    setUpdatePublishers(doc);
  };

  // Modal close handler
  const handleCloseError = () => {
    setError(null); // Close modal
  };

  return (
    <>
      <div className="container">
        <div className="publisher">
            {/* Form fields to add new publishers */}
          <h2>Publishers</h2>
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            name="name"
            value={newPublishers.name}
            onChange={handleNewPublishersInputChange}
          />

          <TextField
            id="standard-basic"
            label="Establishment Year"
            variant="standard"
            name="establishmentYear"
            value={newPublishers.establishmentYear}
            onChange={handleNewPublishersInputChange}
          />

          <TextField
            id="standard-basic"
            label="Address"
            variant="standard"
            name="address"
            value={newPublishers.address}
            onChange={handleNewPublishersInputChange}
          />

          <Button
            id="button"
            variant="contained"
            color="primary"
            onClick={handleAddNewPublishersBtn}
          >
            Save
          </Button>
        </div>

        <div className="updatePublisher">
           {/* Form fields to update the current publishers */}
          <h2>Update Publishers</h2>
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            name="name"
            value={updatePublishers.name}
            onChange={handleUpdatePublishersInputChange}
          />

          <TextField
            id="standard-basic"
            label="Establishment Year"
            variant="standard"
            name="establishmentYear"
            value={updatePublishers.establishmentYear}
            onChange={handleUpdatePublishersInputChange}
          />

          <TextField
            id="standard-basic"
            label="Address"
            variant="standard"
            name="address"
            value={updatePublishers.address}
            onChange={handleUpdatePublishersInputChange}
          />

          <Button
            id="button"
            variant="contained"
            color="primary"
            onClick={handleUpdatePublishers}
          >
            Save
          </Button>
        </div>
      </div>

  {/*List categories */}
      <TableContainer component={Paper}>
        <Table aria-label="publishers table">
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
                  Publisher Name
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
                  Establishment Year
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
                  Address
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
            {publishers.map((publisher, index) => (
              <TableRow key={index}>
                <TableCell>{publisher.name}</TableCell>
                <TableCell>{publisher.establishmentYear}</TableCell>
                <TableCell>{publisher.address}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdatePublishersBtn(publisher)}
                    style={{ marginRight: 10 }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeletePublishers}
                    id={publisher.id}
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

export default Publishers;

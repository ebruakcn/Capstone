import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
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


const initialAnimal = [
  {
    id: 0,
    name: "",
    publicationYear: 0,
    stock: 0,
    author: {
      id: 0,
      name: "",
      birthDate: 0,
      country: "",
    },
    publisher: {
      id: 0,
      name: "",
      establishmentYear: 0,
      address: "",
    },
    categories: [],
  },
];

function Books() {

  //State
  const [books, setBook] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]);

  const [update, setUpdate] = useState(false);
  const [newBook, setNewBook] = useState(initialAnimal);
  const [updateBooks, setUpdateBooks] = useState(initialAnimal);

  // Modal state to handle error messages
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");


      //Data is retrieved from the API
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/books")
      .then((res) => {
        setBook(res.data);
      }) .catch((error) => {
        setModalMessage("Failed to retrieve books.");
        setOpenModal(true);
      });;
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors")
      .then((res) => {
        setAuthors(res.data);
      }) .catch((error) => {
        setModalMessage("Failed to retrieve authors.");
        setOpenModal(true);
      });;
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers")
      .then((res) => {
        setPublishers(res.data);
      }) .catch((error) => {
        setModalMessage("Failed to retrieve publishers.");
        setOpenModal(true);
      });;
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/categories")
      .then((res) => {
        setCategories(res.data);
      }) .catch((error) => {
        setModalMessage("Failed to retrieve categories.");
        setOpenModal(true);
      });;

    setUpdate(true);
  }, [update]);

  // Updates changes in the input
  const handleNewBooksInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  }; 
  
  // Updates changes in the input
  const handleUpdateBooksInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateBooks((prev) => ({
      ...prev,
      [name]: value,
    }));
   
  };
  
   // Adds new books to the API and updates the status on success
  const handleAddNewBookBtn = () => {
    try {
    axios
      .post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/books", newBook)
      .then(() => {
        setUpdate(false);
        setNewBook(initialAnimal);
      }).catch(() => {
        setModalMessage("Failed to add new book.");
        setOpenModal(true);
      });
  } catch (error) {
    setModalMessage("An unexpected error occurred.");
    setOpenModal(true);
  }
};

    // Deletes the specified book from the API and updates the status on success
  const handleDeleteBooks = (e) => {
    try {
    axios
      .delete(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/books/" + e.target.id
      )
      .then(() => {
        setUpdate(false);
      })  .catch(() => {
        setModalMessage("Failed to delete book.");
        setOpenModal(true);
      });
  } catch (error) {
    setModalMessage("An unexpected error occurred.");
    setOpenModal(true);
  };
  };

    // Updates the specified books and resets the status on success
  const handleUpdateBooks = () => {
    const updatedBook = {};
    if (updateBooks.name) {
      updatedBook.name = updateBooks.name;
    }
  
    if (updateBooks.publicationYear) {
      updatedBook.publicationYear = updateBooks.publicationYear;
    }
    if (updateBooks.stock) {
      updatedBook.stock = updateBooks.stock;
    }
    if (updateBooks.author) {
      updatedBook.author = updateBooks.author;
    }  if (updateBooks.publisher) {
      updatedBook.publisher = updateBooks.publisher;
    }  if (updateBooks.categories) {
      updatedBook.categories = updateBooks.categories;
    }
      if (updateBooks.description) {
      updatedBook.description = updateBooks.description;
    }    try {
    axios
      .put(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/books/" + updateBooks.id,
        updateBooks
      )
      .then(() => {
        setUpdate(false);
        setUpdateBooks(initialAnimal);
      })  .catch(() => {
        setModalMessage("Failed to update book.");
        setOpenModal(true);
      });
  } catch (error) {
    setModalMessage("An unexpected error occurred.");
    setOpenModal(true);
  };
  };

  // Sets the selected book for update status
  const handleUpdateBooksBtn = (book) => {
    setUpdateBooks(book);
  };


  const handleAuthorSelect = (e) => {
    const { value } = e.target;
    const newBookAuthor = authors.find((author) => author.id === value);
    setNewBook((prev) => ({
      ...prev,

      author: newBookAuthor,
    }));
  };
  const handleUpdateAuthorSelect = (e) => {
    const { value } = e.target;
    const updatedAuthor = authors.find((author) => author.id === value); 
    setUpdateBooks((prev) => ({
      ...prev,
      author: updatedAuthor, 
    }));
  };

  const handlePublishersSelect = (e) => {
    const { value } = e.target;
    const newBookPublishers = publishers.find(
      (publisher) => publisher.id === value
    );
    setNewBook((prev) => ({
      ...prev,

      publisher: newBookPublishers,
    }));
  };
  const handleUpdatePublishersSelect = (e) => {
    const { value } = e.target;
    const updatedPublisher = publishers.find(
      (publisher) => publisher.id === value
    );
    setUpdateBooks((prev) => ({
      ...prev,
      publisher: updatedPublisher, 
    }));
  };

  const handleCategoriesSelect = (e) => {
    const { value } = e.target;
    const newBookCategories = categories.find((item) => item.id === value);
    setNewBook((prev) => ({
      ...prev,

      categories: [newBookCategories],
    }));
    
  };
  const handleUpdateCategoriesSelect = (e) => {
    const { value } = e.target; 

    const selectedCategory = categories?.find(
      (category) => category.id === value
    ); 

    if (selectedCategory) {
      setUpdateBooks((prev) => ({
        ...prev,
        categories: [selectedCategory], 
      }));
    } else {
      console.error("");
    }
  };

  // Modal close handler
  const handleCloseModal = () => {
    setOpenModal(false);
  };


  return (
    <>
      <div className="container">
        <div className="books">
          <h2>Book</h2>
          <TextField
            id="standard-basic"
            label="Book Name"
            variant="standard"
            name="name"
            value={newBook.name || ""} 
            onChange={handleNewBooksInputChange}
          />
       
          <TextField
            id="standard-basic"
            label="Publication Year"
            variant="standard"
            name="publicationYear"
            value={newBook.publicationYear || ""} 
            onChange={handleNewBooksInputChange}
          />
         
          <TextField
            id="standard-basic"
            label="Stock"
            variant="standard"
            name="stock"
            value={newBook.stock || ""} 
            onChange={handleNewBooksInputChange}
          />

          <Select
            name="author"
            value={newBook.author?.id || 0}
            variant="standard"
            onChange={handleAuthorSelect}
            displayEmpty
          >
            <MenuItem value={0} disabled>
              {" "}
              Select Authors{" "}
            </MenuItem>
            {authors?.map((author, index) => (
              <MenuItem key={`${index}author`} value={author.id}>
                {author.name}
              </MenuItem>
            ))}
          </Select>
     
          <Select
            name="publisher"
            value={newBook.publisher?.id || 0}
            variant="standard"
            onChange={handlePublishersSelect}
            displayEmpty
          >
            <MenuItem value={0} disabled>
              {" "}
              Select Publisher{" "}
            </MenuItem>
            {publishers?.map((publisher, index) => (
              <MenuItem key={`${index}publisher`} value={publisher.id}>
                {publisher.name}
              </MenuItem>
            ))}
          </Select>
       
          <Select
            name="categories"
            value={newBook.categories?.[0]?.id || 0} // Seçilen kategori ID'sini tut
            variant="standard"
            onChange={handleCategoriesSelect}
            displayEmpty
          >
            <MenuItem value={0} disabled>
              Select Categories{" "}
            </MenuItem>
            {categories?.map((category, index) => (
              <MenuItem key={`${index}categoryy`} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        
          <Button
          id="button"
            variant="contained"
            color="primary"
            onClick={handleAddNewBookBtn}
          >
          Save
          </Button>
        
        </div>

        <div className="updateBooks">
          <h2>Update Book</h2>
          <TextField
            id="standard-basic"
            label="Book Name"
            variant="standard"
            name="name"
            value={updateBooks.name || ""}
            onChange={handleUpdateBooksInputChange}
          />
     
          <TextField
            id="standard-basic"
            label="Publication Year"
            variant="standard"
            name="publicationYear"
            value={updateBooks.publicationYear || ""}
            onChange={handleUpdateBooksInputChange}
          />
     
          <TextField
            id="standard-basic"
            label="Stock"
            variant="standard"
            name="stock"
            value={updateBooks.stock || ""}
            onChange={handleUpdateBooksInputChange}
          />

          <Select
            name="author"
            value={updateBooks.author?.id || 0}
            variant="standard"
            onChange={handleUpdateAuthorSelect}
          >
            <MenuItem value={0} disabled>
              Select Author
            </MenuItem>
            {authors?.map((author, index) => (
              <MenuItem key={index} value={author.id}>
                {author.name}
              </MenuItem>
            ))}
          </Select>

          <Select
            name="publisher"
            value={updateBooks.publisher?.id || 0}
            variant="standard"
            onChange={handleUpdatePublishersSelect}
          >
            <MenuItem value={0} disabled>
              Select Publisher
            </MenuItem>
            {publishers?.map((publisher, index) => (
              <MenuItem key={index} value={publisher.id}>
                {publisher.name}
              </MenuItem>
            ))}
          </Select>

          <Select
            name="categories"
            variant="standard"
            value={updateBooks.categories?.[0]?.id || ""} 
            onChange={handleUpdateCategoriesSelect}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select Category
            </MenuItem>
            {categories?.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>

          <Button
          id="button"
            variant="contained"
            color="primary"
            onClick={handleUpdateBooks}
          >
            Save
          </Button>
       
        </div>
      </div>
    
      <TableContainer component={Paper}>
        <Table aria-label="books table">
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
              Book Name
                </Typography>
              </TableCell><TableCell style={{ backgroundColor: "#317ac4" }}>
                <Typography
                  variant="h8"
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    textTransform: "uppercase",
                  }}
                >
              Publication Year
                </Typography>
              </TableCell><TableCell style={{ backgroundColor: "#317ac4" }}>
                <Typography
                  variant="h8"
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    textTransform: "uppercase",
                  }}
                >
                  Stock
                </Typography>
              </TableCell><TableCell style={{ backgroundColor: "#317ac4" }}>
                <Typography
                  variant="h8"
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    textTransform: "uppercase",
                  }}
                >
                  Author
                </Typography>
              </TableCell><TableCell style={{ backgroundColor: "#317ac4" }}>
                <Typography
                  variant="h8"
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    textTransform: "uppercase",
                  }}
                >
                Publication
                </Typography>
              </TableCell><TableCell style={{ backgroundColor: "#317ac4" }}>
                <Typography
                  variant="h8"
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    textTransform: "uppercase",
                  }}
                >
                  Categories
                </Typography>
              </TableCell><TableCell style={{ backgroundColor: "#317ac4" }} align="center">
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
            {books?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.publicationYear}</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>{item.author?.name}</TableCell>
                <TableCell> {item.publisher?.name}</TableCell>
                <TableCell>
                  {item.categories && item.categories.length > 0
                    ? item.categories.map((category, index) => (
                        <span key={index}>
                          {category.name}
                          {index < item.categories.length - 1 && ", "}
                        </span>
                      ))
                    : "No Categories"}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateBooksBtn(item)}
                    style={{ marginRight: 10 }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeleteBooks}
                    id={item.id}
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

export default Books;

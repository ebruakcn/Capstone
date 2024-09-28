import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import axios from "axios";
import "../App.css";
import React from "react";
import Modal from '../Context/Modal';
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

const initialNewBorrow = {
  borrowerName: "",
  borrowerMail: "",
  borrowingDate: "",
  returnDate: "",
  bookForBorrowingRequest: {
    id: 0,
    name: "",
    publicationYear: 0,
    stock: 0,
  },
};

const initialBorrowResponse = {
  id: 0,
  borrowerName: "",
  borrowerMail: "",
  borrowingDate: "",
  returnDate: "",
  book: {
    id: 0,
    name: "",
    publicationYear: 0,
    stock: 0,
    author: {
      id: 0,
      name: "",
      birthDate: "",
      country: "",
    },
    publisher: {
      id: 0,
      name: "",
      establishmentYear: 0,
      address: "",
    },
    categories: [
      {
        id: 0,
        name: "",
        description: "",
      },
    ],
  },
};

function BookBorrowing() {
  //State
  const [borrow, setBorrow] = useState([]);
  const [books, setBook] = useState([]);

  const [update, setUpdate] = useState(false);
  const [newBorrow, setNewBorrow] = useState(initialNewBorrow);
  const [updateBorrow, setUpdateBorrow] = useState(initialBorrowResponse);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false); // Yükleniyor durumu için state

    const validateForm = () => {
      const { borrowerName, borrowerMail, borrowingDate, bookForBorrowingRequest } = newBorrow;
      if (!borrowerName || !borrowerMail || !borrowingDate || !bookForBorrowingRequest) {
          setErrorMessage('All fields are required.');
          setIsModalOpen(true);
          return false;
      }
      // E-posta formatı kontrolü
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(borrowerMail)) {
          setErrorMessage('Geçerli bir e-posta adresi girin.');
          setIsModalOpen(true);
          return false;
      }
      return true; 
  };
  


  //Data is retrieved from the API
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/borrows")
      .then((res) => {
        setBorrow(res.data);
      });

    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/books")
      .then((res) => {
        setBook(res.data);
      });

    setUpdate(true);
  }, [update]);

  const handleNewBorrowInputChange = (e) => {
    const { name, value } = e.target;
    setNewBorrow((prev) => {
      const updatedBorrow = {
        ...prev,
        [name]: value,
      };

      return updatedBorrow;
    });
  };

  const handleBookSelect = (e) => {
    const { value } = e.target;
    const selectedBook = books.find((book) => book.id === value);
    setNewBorrow((prev) => ({
      ...prev,
      bookForBorrowingRequest: selectedBook,
    }));
  };

  const handleUpdateBookSelect = (e) => {
    const { value } = e.target;
    const updatedBook = books.find((book) => book.id === value);
    setUpdateBorrow((prev) => ({
      ...prev,
      bookForBorrowingRequest: updatedBook,
    }));
  };

  const handleAddNewBorrowBtn = () => {
    if (!validateForm()) return; 

    setLoading(true); 
    


    const selectedBook = newBorrow.bookForBorrowingRequest;
    if (selectedBook.stock <= 0) {
        setErrorMessage('The selected book is not in stock.');
        setIsModalOpen(true);
        setLoading(false); 
        return;
    }

    const borrowDataToPost = {
      borrowerName: newBorrow.borrowerName,
      borrowerMail: newBorrow.borrowerMail,
      borrowingDate: newBorrow.borrowingDate,
      returnDate: newBorrow.returnDate,
      bookForBorrowingRequest: {
        id: newBorrow.bookForBorrowingRequest.id,
        name: newBorrow.bookForBorrowingRequest.name,
        publicationYear: newBorrow.bookForBorrowingRequest.publicationYear,
        stock: newBorrow.bookForBorrowingRequest.stock,
      },
    };

    axios
      .post(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/borrows",
        borrowDataToPost
      )  .then(() => {
    
        return axios.put(
            import.meta.env.VITE_APP_BASE_URL + "/api/v1/books/" + selectedBook.id,
            { ...selectedBook, stock: selectedBook.stock - 1 }
        );
    })
      .then(() => {
        setUpdate(false); 
        setNewBorrow(initialNewBorrow); 
        setLoading(false);
      }) .catch((error) => {
        setErrorMessage('An error occurred during the borrowing process:' + error.message);
        setIsModalOpen(true);
        setLoading(false); 
      });;

  };

  const handleDeleteBooks = (e) => {
    axios
      .delete(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/borrows/" + e.target.id
      )
      .then(() => {
        setUpdate(false);
      }).catch((error) => {
        setErrorMessage('An error occurred during deletion: ' + error.message);
        setIsModalOpen(true);
      });
  };

  const handleUpdateBorrow = () => {
    
    const borrowDataToUpdate = {
      borrowerName: updateBorrow.borrowerName,
      borrowerMail: updateBorrow.borrowerMail,
      borrowingDate: updateBorrow.borrowingDate,
      returnDate: updateBorrow.returnDate,
      bookForBorrowingRequest: updateBorrow.bookForBorrowingRequest,
    };

    axios
      .put(
        import.meta.env.VITE_APP_BASE_URL +
          "/api/v1/borrows/" +
          updateBorrow.id,
        borrowDataToUpdate
      )
      .then(() => {
        setUpdate(false);
        setUpdateBorrow(initialBorrowResponse);
      }) .catch((error) => {
        setErrorMessage('An error occurred during the update process: ' + error.message);
        setIsModalOpen(true);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMessage('');
  };

  const handleUpdateBorrowInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateBorrow((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleUpdateBorrowBtn = (borrow) => {
    setUpdateBorrow(borrow);
  };

  return (
    <>
      <div className="container">
        <div className="borrowBook">
          <h2>Book</h2>
          <TextField
            id="standard-basic"
            label="Borrower Name"
            variant="standard"
            name="borrowerName"
            value={newBorrow.borrowerName || ""}
            onChange={handleNewBorrowInputChange}
          />
      
          <TextField
            id="standard-basic"
            label="Borrower Mail"
            variant="standard"
            name="borrowerMail"
            type="email"
            value={newBorrow.borrowerMail || ""}
            onChange={handleNewBorrowInputChange}
          />


          <TextField
            id="standard-basic"
            label="Borrowing Date"
            variant="standard"
            name="borrowingDate"
            type="date"
            value={newBorrow.borrowingDate || ""}
            onChange={handleNewBorrowInputChange}
            InputLabelProps={{
              shrink: true, // Etiketin yukarıda durmasını sağlar
            }}
          />

          <TextField
            id="standard-basic"
            label="Return Date"
            variant="standard"
            name="returnDate"
            type="date"
            value={newBorrow.returnDate || ""}
            onChange={handleNewBorrowInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />

        
          <Select
            name="book"
            value={newBorrow.bookForBorrowingRequest.id || ""}
            variant="standard"
            onChange={handleBookSelect}
            displayEmpty
          >
            <MenuItem value=""  disabled>
              Select book{" "}
            </MenuItem>
            {books?.map((item, index) => (
              <MenuItem key={`${index}books`} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>

          {loading ? (
    <div className="loader">Loading...</div>
) : ( <Button
          id="button"
            variant="contained"
            color="primary"
            onClick={handleAddNewBorrowBtn}
          >
       Save
          </Button>)}
      
        </div>

    
          <div className="updateBorrowedBook">
            <h2>Update Borrowing</h2>
            <TextField
              id="standard-basic"
              label="Borrower Name"
              variant="standard"
              name="borrowerName"
              value={updateBorrow.borrowerName || ""}
              onChange={handleUpdateBorrowInputChange}
            />
          
            <TextField
              id="standard-basic"
              label="Borrower Mail"
              variant="standard"
              name="borrowerMail"
              value={updateBorrow.borrowerMail || ""}
              onChange={handleUpdateBorrowInputChange}
              type="mail"
            />
        
            <TextField
              id="standard-basic"
              label="Borrowing Date"
              variant="standard"
              name="borrowingDate"
              value={updateBorrow.borrowingDate || ""}
              onChange={handleUpdateBorrowInputChange}
              type="date"
              InputLabelProps={{
                shrink: true, // Etiketin yukarıda durmasını sağlar
              }}
            />
            <TextField
              id="standard-basic"
              label="Return Date"
              variant="standard"
              name="returnDate"
              value={updateBorrow.returnDate || ""}
              onChange={handleUpdateBorrowInputChange}
              type="date"
              InputLabelProps={{
                shrink: true, // Etiketin yukarıda durmasını sağlar
              }}
            />

            <Select
              name="book"
              value={0}
              variant="standard"
              onChange={handleUpdateBookSelect}
            >
              <MenuItem value={0} disabled>
                Select book{" "}
              </MenuItem>
              {books?.map((item, index) => (
                <MenuItem key={`${index}books`} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            
            {loading ? (
    <div className="loader">Yükleniyor...</div>
) : ( <Button
            id="button"
              variant="contained"
              color="primary"
              onClick={handleUpdateBorrow}
            >
             Save
            </Button>)}
          
          </div>
        </div>
        <Modal isOpen={isModalOpen} message={errorMessage} onClose={closeModal} />
      <hr />
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
              </TableCell> <TableCell style={{ backgroundColor: "#317ac4" }}>
                <Typography
                  variant="h8"
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    textTransform: "uppercase",
                  }}
                >
              Borrower Mail
                </Typography>
              </TableCell> <TableCell style={{ backgroundColor: "#317ac4" }}>
                <Typography
                  variant="h8"
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    textTransform: "uppercase",
                  }}
                >
               Borrowing Date
                </Typography>
              </TableCell> <TableCell style={{ backgroundColor: "#317ac4" }}>
                <Typography
                  variant="h8"
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    textTransform: "uppercase",
                  }}
                >
              Return Date
                </Typography>
              </TableCell> <TableCell style={{ backgroundColor: "#317ac4" }}>
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
              </TableCell> <TableCell style={{ backgroundColor: "#317ac4" }}>
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
              </TableCell> <TableCell style={{ backgroundColor: "#317ac4" }}>
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
              </TableCell> <TableCell style={{ backgroundColor: "#317ac4" }}>
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
              </TableCell> <TableCell style={{ backgroundColor: "#317ac4" }} align="center">
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
            {borrow?.length > 0 ? (
              borrow.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.borrowerName}</TableCell>
                  <TableCell>{item.borrowerMail}</TableCell>
                  <TableCell>{item.borrowingDate}</TableCell>
                  <TableCell>{item?.returnDate?.data}</TableCell>

                  <TableCell>{item.book?.name}</TableCell>
                  <TableCell>{item.book?.author.name}</TableCell>
                  <TableCell>{item.book?.publisher.name}</TableCell>
                  <TableCell>
                    {item.book?.categories
                      .map((category) => category.name)
                      .join(", ")}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdateBorrowBtn(item)}
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No borrow data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default BookBorrowing;

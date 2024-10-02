# Library Management System

The project is a book borrowing and management system for a library. Users can view available books, borrow books, view book and author information, and list books by category. Spring Boot is used as the backend and React is used on the frontend. The project is containerized using Docker and integrated with a database.

## Project Content
- Book Borrowing: Users can borrow one of the available books by selecting it.
- Book Selection: The stock status and information of the books are listed. Unavailable books cannot be selected.
- List of Borrowed Books: Borrowed books are listed, the user can delete the book they borrowed.
- Stock Management: When a book is borrowed, the stock status is automatically updated.
- Database Integration: Data is kept in a database on the backend side.

## Usage
- Book Borrowing: Enter the borrower's name, email, borrow date, return date, and select a book from the drop-down list. Click "Save" to submit the form. When you want to - update, click Update to update your information. You can also delete your information with Delete
- Book: Enter the book's title, year of publication, stock, and select the author, publisher, and category from the drop-down list. Click "Save" to submit the form. When you want to make an update, click Update to update your information. You can also delete your information by using Delete
- Author: Enter the author's name, year of birth, country. Click "Save" to submit the form. When you want to update, click Update to update your information. You can also delete your information with Delete
- Publisher: Enter the publisher's name, year of establishment, and address. Click "Save" to submit the form. When you want to make an update, click Update to update your information. You can also delete your information by using Delete
- Categories: Enter the category name and description. Click "Save" to submit the form. When you want to make an update, click Update to update your information. You can also delete your information by using Delete

## Project Structure
- Backend: Spring Boot
- CRUD operations: Add, update, delete, list books
- API: Provides data to frontend with RESTful service.
- Database: Manages book and borrowing data.
- Frontend: React

## List and select books
- Borrowing transactions
- Form validations and error management (with modals)
- Docker: Container structure for easy installation and operation of the application.

## Technologies Used
- Frontend: React, MUI, React Router, Axios (Material-UI)
- Backend: Spring Boot, REST API, JPA, Hibernate
- Database: PostgreSQL
- Other: Docker, Axios (for HTTP requests), React Router, React Hooks

## Installation Steps
### Requirements
Node.js (>= 14.x)
Docker
Java (>= 11.x)
PostgreSQL

```
Book/
├── public
├── src
│   ├──components
│   └── Navbar.jsx 
│   ├── pages
│   │   └── Authors.jsx        
│   │   └── Books.jsx        
│   │   └── BookBorrowing.jsx        
│   │   └── Category.jsx       
│   │   └── Home.jsx        
│   │   └── Publishers.jsx        
│   ├──context
│   │   └── Modal.jsx      
│   │   └── Modal.css         
│   ├── App.css            
│   ├── App.jsx            
│   ├── index.css           
│   └── env                
├── .gitignore
├── package.json
└── README.md
LibraryAppSpringBoot-main/
          
```

# Live Demo
[LibraryAppLive](https://book-lzoi.vercel.app/)

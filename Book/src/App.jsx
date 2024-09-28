import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Publishers from './pages/Publishers';
import Category from './pages/Category';
import Books from './pages/Books';
import Authors from './pages/Authors';
import BookBorrowing from './pages/BookBorrowing';
import './App.css'; 
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/publisher" element={<Publishers />} />
          <Route path="/category" element={<Category />} />
          <Route path="/book" element={<Books />} />
          <Route path="/author" element={<Authors />} />
          <Route path="/bookborrowing" element={<BookBorrowing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography color="inherit" component={Link} sx={{ flexGrow: 1 }} to="/">
          Home Page
        </Typography>
        <Button color="inherit" component={Link} to="/book">Books</Button>
        <Button color="inherit" component={Link} to="/author">Authors</Button>
        <Button color="inherit" component={Link} to="/publisher">Publishers</Button>
        <Button color="inherit" component={Link} to="/category">Category</Button>
        <Button color="inherit" component={Link} to="/bookborrowing">Book Borrowing</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

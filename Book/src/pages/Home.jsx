import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '../App.css';

function Home() {
  return (
    <Box className="home-container">
      <Box className="overlay">
        <Typography variant="h4" component="h1" className="description" color='black'>
          Welcome to the Library. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;

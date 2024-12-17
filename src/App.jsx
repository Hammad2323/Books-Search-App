// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, CircularProgress, Box, Button } from '@mui/material';
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import { useNavigate } from 'react-router-dom';
import { API_KEY } from './config';

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const navigate = useNavigate();

  

  const fetchBooks = async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}&maxResults=10`
      );
      setBooks(response.data.items || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add book to favorites
  const addToFavorites = (book) => {
    const updatedFavorites = [...favorites, book];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Remove book from favorites
  const removeFromFavorites = (bookId) => {
    const updatedFavorites = favorites.filter((book) => book.id !== bookId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // View Favorites
  const viewFavorites = () => {
    navigate('/favorites');
  };

  return (
    <Box sx={{ backgroundColor: '#f8f8f8', minHeight: '100vh', padding: '40px' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            color: '#800020',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '40px',
          }}
        >
          Books Search App
        </Typography>

        <SearchBar onSearch={fetchBooks} />

        <Button
          variant="contained"
          color="secondary"
          sx={{
            backgroundColor: '#2c3e50',
            '&:hover': { backgroundColor: '#0000ff' },
            marginBottom: '30px',
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          onClick={viewFavorites}
        >
          View Favorites
        </Button>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <CircularProgress color="primary" sx={{ width: '50px', height: '50px' }} />
          </Box>
        ) : books.length > 0 ? (
          <Grid container spacing={3} justifyContent="center" sx={{ marginTop: '20px' }}>
            {books.map((book) => (
              <Grid item xs={12} sm={6} md={4} key={book.id}>
                <BookCard
                  book={book}
                  addToFavorites={addToFavorites}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          !loading && (
            <Typography
              align="center"
              color="textSecondary"
              sx={{ fontSize: '18px', marginTop: '50px', fontWeight: 'bold' }}
            >
              No books found. Try searching!
            </Typography>
          )
        )}
      </Container>
    </Box>
  );
};

export default App;
// src/components/FavoritesPage.js
import React, { useState } from 'react';
import { Container, Grid, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from React Router v6
import BookCard from './BookCard';

const FavoritesPage = () => {
  const navigate = useNavigate();  // Use useNavigate instead of useHistory
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

  // Go back to search page
  const goBack = () => {
    navigate('/');  // Use navigate to go back to the search page
  };

  // Remove book from favorites
  const removeFromFavorites = (bookId) => {
    const updatedFavorites = favorites.filter((book) => book.id !== bookId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <Box sx={{ backgroundColor: '#f4f6f8', minHeight: '100vh', padding: '20px' }}>
      <Container maxWidth="md">
        <Typography variant="h3" align="center" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
          Your Favorite Books
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          sx={{ marginBottom: '20px' }}
          onClick={goBack}
        >
          Go Back to Search
        </Button>

        {favorites.length === 0 ? (
          <Typography align="center" color="textSecondary">
            You have no favorite books yet.
          </Typography>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {favorites.map((book) => (
              <Grid item xs={12} sm={6} md={4} key={book.id}>
                <BookCard
                  book={book}
                  addToFavorites={() => {}}  // No need to add to favorites on this page
                />
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    width: '100%',
                    marginTop: '10px',
                    fontWeight: 'bold',
                  }}
                  onClick={() => removeFromFavorites(book.id)}  // Remove the book from favorites
                >
                  Remove from Favorites
                </Button>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default FavoritesPage;
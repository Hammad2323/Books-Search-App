// src/components/BookCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { saveAs } from 'file-saver';  // Import saveAs from FileSaver.js

const BookCard = ({ book, addToFavorites }) => {
  // Extracting book details
  const { title, authors, imageLinks, previewLink, pdfLink } = book.volumeInfo;

  // Handle PDF download using FileSaver.js
  const handleDownload = () => {
    if (pdfLink) {
      saveAs(pdfLink, `${title}.pdf`);  // Save the PDF file with the book title
    } else {
      alert("PDF not available for this book.");
    }
  };

  // Open the book preview in a new tab
  const openPreviewInNewTab = () => {
    if (previewLink) {
      window.open(previewLink, '_blank');  // Opens the preview link in a new tab
    } else {
      alert("Preview not available for this book.");
    }
  };

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <CardMedia
        component="img"
        height="200"
        image={imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {authors ? authors.join(', ') : 'Author information not available'}
        </Typography>
      </CardContent>
      {/* Button to open book preview in a new tab */}
      <Button onClick={openPreviewInNewTab} variant="contained" color="primary" fullWidth>
        Open Preview
      </Button>
      {/* Button to download PDF */}
      <Button onClick={handleDownload} variant="contained" color="secondary" fullWidth sx={{ marginTop: 2 }}>
        Download PDF
      </Button>
      {/* Button to add book to favorites */}
      <Button onClick={() => addToFavorites(book)} variant="outlined" color="secondary" fullWidth sx={{ marginTop: 2 }}>
        Add to Favorites
      </Button>
    </Card>
  );
};

export default BookCard;
import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";

const BookCard = ({ book, onOpenModal }) => {
  const { title, authors, imageLinks } = book.volumeInfo;

  return (
    <Card
      onClick={() => onOpenModal(book)}
      sx={{
        cursor: "pointer",
        borderRadius: "24px",
        overflow: "hidden",
        bgcolor: "#1E2B25",
        color: "#E8FCEE",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        transition: "0.4s",
        "&:hover": {
          transform: "translateY(-6px) scale(1.02)",
          boxShadow: "0 0 25px #A7DCA4AA",
        },
      }}
    >
      <CardMedia
        component="img"
        height="240"
        image={imageLinks?.thumbnail || "/assets/placeholder.png"}
        alt={title}
        sx={{
          objectFit: "cover",
          borderBottom: "3px solid #2E8B57",
        }}
      />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "#CFE9D8" }}>
          {authors ? authors.join(", ") : "Unknown Author"}
        </Typography>
      </CardContent>
      <Box sx={{ px: 2, pb: 2 }}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#2E8B57",
            color: "#fff",
            borderRadius: "12px",
            textTransform: "none",
            "&:hover": { bgcolor: "#1B4332" },
          }}
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
};

export default BookCard;

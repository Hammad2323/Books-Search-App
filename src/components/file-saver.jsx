import { saveAs } from 'file-saver';

const handleDownload = () => {
  if (pdfLink) {
    saveAs(pdfLink, `${title}.pdf`);
  } else {
    alert("PDF not available for this book.");
  }
};
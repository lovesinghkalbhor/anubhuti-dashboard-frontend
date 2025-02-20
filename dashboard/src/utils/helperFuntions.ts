import html2pdf from "html2pdf.js";
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0"); // Ensures two-digit day
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const validateSearchText = (text: string): boolean => {
  // Check if the string is empty
  if (text.trim() === "") {
    return false;
  }

  // Check if the string is either a valid number or contains only valid letters (A-Z or a-z)
  const isValid = /^[A-Za-z0-9]+$/.test(text);
  return isValid;
};

const validateDate = (date: string): boolean => {
  // Check if the input matches the format YYYY-MM-DD
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

  if (!dateRegex.test(date)) {
    return false;
  }

  // Parse the date components
  const [year, month, day] = date.split("-").map(Number);

  // Create a Date object and check if it's valid
  const parsedDate = new Date(year, month - 1, day); // Month is 0-indexed
  return (
    parsedDate.getFullYear() === year &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getDate() === day
  );
};
const handleConvertToPDF = (htmlContent: any) => {
  const logoImage = new Image(); // Create a new Image object
  logoImage.src = "http://anubhutivisionss.com/images/AnubhutiLogo.png";

  logoImage.onload = () => {
    // This code will execute *after* the image has fully loaded
    const opt = {
      margin: 10,
      filename: "Donation-receipt.pdf",
      image: { type: "jpeg", quality: 0.2 },

      html2canvas: {
        scale: 2,
        allowTaint: true, // Add this line**
        useCORS: true, // Add this line**
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(htmlContent).set(opt).save();
  };

  logoImage.onerror = () => {
    console.error("Error loading image before PDF conversion.");
    // Optionally handle image loading error (e.g., display a placeholder, notify user)
    // You might still proceed with PDF generation without the logo, or prevent it.
    const opt = {
      // Proceed with PDF generation even if logo fails to load (optional)
      margin: 10,
      filename: "Donation-receipt.pdf",
      image: { type: "jpeg", quality: 0.2 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(htmlContent).set(opt).save();
  };
};
// const opt = {
//   // Optional configurations for html2pdf.js
//   margin: 10,
//   filename: "Donation-receipt.pdf", // Default filename
//   image: { type: "jpeg", quality: 0.7 },
//   html2canvas: { scale: 2 },
//   jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
// };
// html2pdf()
//   .from(htmlContent) // Source element to convert
//   .set(opt) // Configuration options
//   .save(); // Trigger download

export { formatDate, validateSearchText, validateDate, handleConvertToPDF };

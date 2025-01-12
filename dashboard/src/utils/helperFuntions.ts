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

export { formatDate, validateSearchText, validateDate };

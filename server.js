const express = require('express');
const app = express();

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server on a specified port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
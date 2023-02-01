const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname)));

// Define a basic route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server on a specified port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

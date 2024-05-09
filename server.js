Copy code
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

// Define routes
app.use('/api', require('./routes/authRoutes'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
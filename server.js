const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Allows JSON request bodies
app.use(cors());

// Sample Route
app.post("/submit", (req, res) => {
    console.log("Received data:", req.body);
    res.json({ message: "Form submitted successfully!" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

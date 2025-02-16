const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json()); // Ensure the server can parse JSON requests

// Debugging middleware (logs every request)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
    console.log("Request Body:", req.body);
    next();
});

// Handle form submission
app.post("/submit", (req, res) => {
    console.log("Received data:", req.body); // Log received data

    if (!req.body.variables) {
        return res.status(400).json({ error: "Missing 'variables' field" });
    }

    res.json({ message: "Form received successfully!" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const cors = require("cors");
const axios = require("axios"); 
const app = express();

app.use(cors());
app.use(express.json());

// Debugging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
    console.log("Request Body:", req.body);
    next();
});

// Handle form submission and forward to BotGhost API
app.post("/submit", async (req, res) => {
    console.log("Received data:", req.body);

    if (!req.body.variables) {
        return res.status(400).json({ error: "Missing 'variables' field" });
    }

    try {
        const botghostResponse = await axios.post(
            "https://api.botghost.com/webhook/1338030060300402688/e3gti17gvfjpej1s7vau", // Replace with correct webhook
            req.body,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "5ecb576597790e7a7e0c9934e819cacc1565e0bfef65479b45432c0548d318c2" // Replace with your actual API key
                }
            }
        );

        console.log("BotGhost API Response:", botghostResponse.data);
        res.json({ message: "Form data sent to BotGhost successfully!" });

    } catch (error) {
        console.error("Error sending data to BotGhost:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to send data to BotGhost API" });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

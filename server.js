// server.js - Main entry point for the Node.js application

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const numberConverter = require('./converters/numberConverter');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint for number conversion
app.post('/api/convert', (req, res) => {
    try {
        const { value, inputType } = req.body;
        
        if (!value || !inputType) {
            return res.status(400).json({
                success: false,
                error: 'Missing required parameters'
            });
        }

        // Validate input based on type
        if (!numberConverter.validateInput(value, inputType)) {
            return res.status(400).json({
                success: false,
                error: `Invalid ${inputType} number format`
            });
        }

        // Convert the input value
        const result = numberConverter.convertNumber(value, inputType);
        
        return res.json({
            success: true,
            result
        });
    } catch (error) {
        console.error('Conversion error:', error);
        return res.status(500).json({
            success: false,
            error: 'Conversion error: ' + error.message
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser`);
});
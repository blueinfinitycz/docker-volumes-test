const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json({limit: '1mb'}), express.urlencoded({ extended: true }));
app.use(cors());

app.get('/get-messages', async (req, res) => {
    try {
        // Získá data z Backend kontejneru
        const response = await fetch('http://backend:5000/get-messages');
        const data = await response.json();
        console.log('Fetching messages from backend: ', data);
        res.json(data);
    } catch (error) {
        console.error('Error fetching from backend:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/send-message', (req, res) => {
    console.log('Received message:', req.body);
   //Předá požadavek Backend kontejneru
    fetch('http://backend:5000/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    });
    res.json({success: true});
});

app.listen(PORT,'0.0.0.0', () => {
    console.log(`API Server is running on http://0.0.0.0:${PORT}`);
});
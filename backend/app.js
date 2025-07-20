const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5000;

const DATA_DIR = '/app/data';
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

// Inicializace - vytvoř složku a soubor pokud neexistují
function initializeStorage() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(MESSAGES_FILE)) {
        fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2));
        console.log('Created empty messages.json file');
    }
}

// Zavolat při startu
initializeStorage();

app.use(express.json({limit: '1mb'}), express.urlencoded({ extended: true }));

app.get('/get-messages', (req, res) => {
    // Získá data z Backend kontejneru
    if (!fs.existsSync(MESSAGES_FILE)) {
        return res.status(404).json({ error: 'Messages file not found' });
    }
    fs.readFile(MESSAGES_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading messages file:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('File reading: ', data);
        res.json(JSON.parse(data));
    });
});
app.post('/send-message', (req, res) => {
    console.log('File writing:');
   //Předá požadavek Backend kontejneru
    const message = req.body.message;
    console.log('Received message:', req.body);
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }
    fs.readFile(MESSAGES_FILE, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading messages file:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const messages = data ? JSON.parse(data) : [];
        messages.push({ message, timestamp: new Date() });
 
        fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing messages file:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            console.log('Message saved successfully');
            res.json({ success: true });
        });
    });
});

app.listen(PORT,'0.0.0.0', () => {
    console.log(`Backend Server is running on http://localhost:${PORT}`);
});
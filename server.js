const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
const fetch = require('node-fetch'); // Add this line to import fetch
dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = process.env.API_KEY;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post(`${process.env.REACT_APP_API_URL}/generate`, async (req, res) => { // Use backticks for string interpolation
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: 'user', content: "create a sql req to " + req.body.message }],
            max_tokens: 100,
        })
    };

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);

        if (response.ok) {
            const data = await response.json();
            res.send(data.choices[0].message);
        } else {
            // Handle the case where the OpenAI API request fails
            console.error('OpenAI API request failed');
            res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

console.log('hi');
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

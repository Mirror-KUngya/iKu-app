const express = require('express');
//const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
//app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.get('/greeting', (req, res) => {
    res.json({ message: 'Hello from the API!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
const express = require('express');
//const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const {swaggerUi, specs} = require("./lib/swagger")

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))
//app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.get('/greeting', (req, res) => {
    res.json({ message: 'Hello from the API!' });
});


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
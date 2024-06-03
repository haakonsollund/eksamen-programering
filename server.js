const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;

const storagefil = './storage.json'

app.use(express.json())
app.use(cors())








app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
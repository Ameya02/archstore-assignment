const express = require('express');
const http = require('http');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send("Server is up and running")
});

app.use("/api", require("./routes.js"))

const server = http.createServer(app);
server.listen(port, () => {
    console.log("Server is up and running on port 3000")
});



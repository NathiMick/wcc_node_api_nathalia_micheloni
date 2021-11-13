const express = require("express");
const app = express();

const port = 8080;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("My first req in Women Can Code");
});

app.get("/segunda-req", (req, res) => {
    res.send("my second req in Women Can Code");
});

app.get("/com-parametros", (req, res) => {
    res.send(`Com parametros funciona: ${req.query.name}`);
});


app.listen(port, () => console.log(`Server is running at ${port}`));


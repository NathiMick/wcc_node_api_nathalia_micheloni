const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("My first req in Women Can Code");
});


const database = require("./models");
database.sequelizeDatabase.sync();
// database.sequelizeDatabase.sync({ force: true}).then(() => {
//     console.log("Drop and re-sync db.");
// });

const router = require("./routes/artigos.routes");
router(app);




app.listen(port, () => console.log(`Server is running at ${port}`));


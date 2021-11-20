
module.exports = (app) => {
    const artigosController = require("../controllers/artigos.controller");
    let router = require("express").Router();

    router.post("/", artigosController.createArticles);

    router.get("/", artigosController.findAllArticles);

    router.get("/:id", artigosController.findById);

    router.get("/findByName", artigosController.findByName);

    app.use("/artigos", router);
}
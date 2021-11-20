
module.exports = (app) => {
    const artigosController = require("../controllers/artigos.controller");
    let router = require("express").Router();

    router.post("/", artigosController.createArticles);

    router.get("/", artigosController.findAllArticles);

    router.get("/findById", artigosController.findById);

    router.get("/findByName", artigosController.findByName);

    router.get("/findPublishedArticle", artigosController.findPublishedArticle);

    router.put("/updateArticle/:id", artigosController.updateArticle);

    router.delete("/deleteAllArticles", artigosController.deleteAllArticles);

    router.delete("/deleteArticle/:id", artigosController.deleteArticle);

    app.use("/artigos", router);
}
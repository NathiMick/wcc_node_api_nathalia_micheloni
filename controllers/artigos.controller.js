
const database = require("../models")
const tabelaArtigos = database.artigos;

//Create Articles

const createArticles = async (request, response) => {

    const { titulo, descricao, publicado } = request.body

    const article = { titulo, descricao, publicado }


    try {

        if (titulo == null || descricao == null ) {
            response.status(400).json({ message:"O artigo deve ter: Titulo, Descrição e se foi publicado ou não"})
            
        } else {

            const newArticle = await tabelaArtigos.create(article);
            response.status(200).json({message: "Artigo Criado com sucesso", newArticle});
           
        }
        
    } catch (error) {
        response.status(500).send("Ocorreu um erro ao salvar o artigo");

    };
};


// ALTERNATIVE SOLUTION FOR CreateArticles

// const createArticles = (request, response) => {
//     const artigo = {
//         titulo: request.body.titulo,
//         descricao: request.body.descricao,
//         publicado: request.body.publicado
//     };

     
//     tabelaArtigos.create(artigo)
//     .then(() => response.send("Artigo criado com sucesso"))
//     .catch(() => response.status(500).send("Ocorreu um erro ao salvar o artigo"))
// };


// List ALL articles

const findAllArticles = async (req, resp) => {
    
    try {
        const allArticles = await tabelaArtigos.findAll();
        resp.status(200).json(allArticles);
        
    } catch (error) {
        resp.status(404).send("Ocorreu um erro ao uscar o artigo")
    }
    
    
};


// Find an article by ID

const findById = async (req, resp) => {

    try {
            const articleId = req.query.id;
            const articleById = await tabelaArtigos.findByPk(articleId)
            if (articleById == null) {
                return resp.status(404).json({ message: `Artigo não encontrado com o id ${articleId}`})
            }
            resp.json(articleById);

        
    } catch (error) {
        resp.status(500).json({ message: `Ocorreu um erro durante a busca pelo artigo.`})

        
    };        


};


// Find an article by title

const findByName = async (req, resp) => {

    const articleName = req.query.titulo;
    const articleFound = await tabelaArtigos.findOne({ where: { titulo: articleName } }).then(function (data) {

                if(data) {
                    resp.json(data);
    
                } else {
                    resp.status(404).send({message: `Artigo não encontrado com o id ${req.query.titulo}`});
                }
                
            }).catch( function ()  {
            resp.status(500).json({ message: `Ocorreu um erro durante a busca pelo artigo.`})
    
        });
    

};


// List ALL published articles

const findPublishedArticle = async (req, resp) => {

      const articleFound = await tabelaArtigos.findAll({ where: { publicado: true } }).then(function (data) {

                if(data) {
                    resp.json(data);
    
                } else {
                    resp.status(404).send({message: `Nenhum artigo publicado`});
                }
                
            }).catch( function ()  {
            resp.status(500).json({ message: `Ocorreu um erro durante a busca pelo artigo.`})
    
        });

};



// Update an article, searching by ID

const updateArticle = async (req, resp) => {

    try {

        const articleID = await tabelaArtigos.findByPk(req.params.id);
        const updateBody = req.body;

        if (!articleID) {
            return resp.status(400).json({message: `Não foi encontrato o artigo ID: ${req.params.id}` });
            
        } else {
               
        if(articleID == null || updateBody == undefined) {
            return resp.status(400).json({message: `Não foi possível atualizar o artigo ID: ${req.params.id}` });
        }

        let keyList = Object.keys(updateBody);
        keyList.forEach((key) => {
            articleID[key] = updateBody[key];
        });

        const articledUpdated = await articleID.save();
        resp.status(200).json([{
            "message": "Artigo atualizado com Sucesso",
            articledUpdated
        }]);
    }

        
    } catch (error) {

        resp.status(500).json({ message: `Ocorreu um erro durante a atualização do artigo.`})

    }


    //ALTERNATIVE SOLUTION FOR updateArticle:

    // const { id: articleID } = req.params;
    // const updates = req.body;
    // const query = { where: { id: articleID }, returning: true }

    // if(!articleID) {
    //     return resp.status(400).json({ message: `Não foi possível atualizar, pois o ID não foi informado`})
    // }

    // await tabelaArtigos.update(updates, query).then(function(data) {
    //     resp.status(200).send({message: `Artigo atualizado com sucesso`,data});



    // }).catch(function (error) {
    //     response.status(500).send("Ocorreu um erro ao salvar o artigo");
        
    // });

};


// DELETE ALL ARTICLES

const deleteAllArticles = async (req, resp) => {

    const deleteAll = await tabelaArtigos.destroy({where: {}, truncate: false}) //truncate preserve Table structure
    .then(itensDeleted => {
        
        resp.send({message: `Foram deletados ${itensDeleted} artigos`});

    }).catch( error => {
        resp.status(500).send("Ocorreu um erro ao deletar os artigos");
    })

};


const deleteArticle = async (req, resp) => {

    try {
        const { id: articleID } = req.params;
        const foundArticleByID = await tabelaArtigos.findByPk(articleID)
        
        if(foundArticleByID == null) {
            return resp.status(404).json({message: `Artigo ${articleID} não encontrado`})
        } 
        
        await foundArticleByID.destroy();
        resp.status(202).json({message: `Artigo ${articleID} deletado com sucesso!`})
        
    } catch (error) {
        resp.status(500).send(`Ocorreu um erro ao deletar o artigo ${articleID}`);
    };



    //ALTERNATIVE SOLUTION FOR deleteArticle

    // const { id: articleID } = req.params;

    // await tabelaArtigos.destroy({where: {id: id}})
    // .then(deletedItens => {
    //     if(deletedItens === 0) {
    //         resp.send(`0 item com ID ${articleID}` );
        
    //     } else {
    //         resp.send({message: `Artigo ${articleID} deletado com sucesso!`})

    //     };

    // }).catch(error => {
    //     resp.status(500).send(`Ocorreu um erro ao deletar o artigo ${req.params.id}`)
    // });



};


    

module.exports = {
    findAllArticles,
    createArticles,
    findById,
    findByName,
    findPublishedArticle,
    updateArticle,
    deleteAllArticles,
    deleteArticle

}


// ALTERNATIVE SOLUTION FOR exports:
// exports.findAll = (req, resp) => {
//     tabelaArtigos.findAll().then((data) => {
//         resp.send(data);

//     }).catch(() => {
//         resp.status(500).send("Ocorreu um erro ao uscar o artigo")
//     })
// }

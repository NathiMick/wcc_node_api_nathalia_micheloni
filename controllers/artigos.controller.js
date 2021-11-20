// regras de negócio do sistema de artigos

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


// Outra Solução para createArticles

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


const findAllArticles = async (req, resp) => {
    
    try {
        const allArticles = await tabelaArtigos.findAll();
        resp.status(200).json(allArticles);
        
    } catch (error) {
        resp.status(404).send("Ocorreu um erro ao uscar o artigo")
    }
    
    
}

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

        
    }        


}



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
    
        })
    

}   
    

module.exports = {
    findAllArticles,
    createArticles,
    findById,
    findByName

}


// Outra Solução para exports:
// exports.findAll = (req, resp) => {
//     tabelaArtigos.findAll().then((data) => {
//         resp.send(data);

//     }).catch(() => {
//         resp.status(500).send("Ocorreu um erro ao uscar o artigo")
//     })
// }

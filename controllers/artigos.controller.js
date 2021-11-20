// regras de negócio do sistema de artigos

const database = require("../models")
const tabelaArtigos = database.artigos;

//Create Articles

const createArticles = async (request, response) => {
    const article = {
        titulo: request.body.titulo,
        descricao: request.body.descricao,
        publicado: request.body.publicado
    };

    try {
        const newArticle = await tabelaArtigos.create(article);
        response.status(200).json({message: "Artigo Criado com sucesso", newArticle});
        
        
    } catch (error) {
        response.status(500).send("Ocorreu um erro ao salvar o artigo");

    };
};


// Outra Solução
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
            const articleById = await tabelaArtigos.findByPk(req.params.id)
            if (articleById == null) {
                return resp.status(404).json({ message: `Artigo não encontrado com o id ${req.params.id}`})
            }
            resp.json(articleById);

        
    } catch (error) {
        resp.status(500).json({ message: `Ocorreu um erro durante a busca pelo artigo.`})

        
    }        


}



const findByName = async (req, resp) => {

    // try {
    //     const articleName = await tabelaArtigos.findOne(req.query.titulo, function(err, result) {
    //         if (err) {
    //             result = resp.status(404).json({ message: `Artigo não encontrado com o nome ${name}`});
    //         }
    //         result = resp.json(articleName);

    //         return result;
    //     })
        
    // } catch (error) {
    //     resp.status(404).json({ message: `Ocorreu um erro durante a busca pelo artigo.`})

    // }


    // try {
    //     const articleName = await tabelaArtigos.findOne({ where: { titulo: req.query.titulo } });
    //     if (articleName == null) {
    //         return resp.status(404).json({ message: `Artigo não encontrado com o id ${req.query.titulo}`})
    //     }
    //     resp.json(articleName);




        
    // } catch (error) {
    //     resp.status(500).json({ message: `Ocorreu um erro durante a busca pelo artigo.`})

    // }



    
    //     const articleName = await tabelaArtigos.findOne({ where: { titulo: req.query.titulo } }).then(function (titulo) {

    //         if(titulo) {
    //             resp.json(titulo);

    //         } else {
    //             resp.status(404).send({message: `Artigo não encontrado com o id ${req.query.titulo}`});
    //         }
            
    //     }).catch( function ()  {
    //     resp.status(500).json({ message: `Ocorreu um erro durante a busca pelo artigo.`})

    // })

    
    try {
        
        const articleName = await tabelaArtigos.find(req.query.titulo);
        return resp.status(200).json(articleName);
    } catch (error) {
        resp.status(500).json({ message: `Ocorreu um erro durante a busca pelo artigo.`})

    }



}   
    

module.exports = {
    findAllArticles,
    createArticles,
    findById,
    findByName

}




// Outra Solução:
// exports.findAll = (req, resp) => {
//     tabelaArtigos.findAll().then((data) => {
//         resp.send(data);

//     }).catch(() => {
//         resp.status(500).send("Ocorreu um erro ao uscar o artigo")
//     })
// }

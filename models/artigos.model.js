
module.exports = (sequelizeDatabase, Sequelize) => {
    const Artigo = sequelizeDatabase.define("artigos", {
        titulo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        descricao: {
            type: Sequelize.STRING,
            allowNull: false
        },
        publicado: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });

    return Artigo;
}
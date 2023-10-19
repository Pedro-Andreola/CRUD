const {Sequelize} = require('sequelize')
const sequelize = new Sequelize('atv01', 'root', 'senai', {
    host: 'localhost',
    dialect: 'mysql'
})

// sequelize.authenticate().then(()=>{
//     console.log('Conexão com o banco')
// }).catch((err)=>{
//     console.error('Erro de conexão com o banco '+ err)
// })

module.exports = sequelize
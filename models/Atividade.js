const {DataTypes} = require('sequelize')
const db = require('../db/conn')
const Atividade = db.define('atividade', {
    nome:{
        type:DataTypes.STRING(50)
    }
},{
    createdAt:false,
    updatedAt:false
})

// Atividade.sync({force:true})

module.exports = Atividade
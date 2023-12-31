const {DataTypes} = require('sequelize')
const db = require('../db/conn')
const Usuario = db.define('usuario', {
    nome:{
        type:DataTypes.STRING(50)
    },
    email:{
        type:DataTypes.STRING(75)
    },
    senha:{
        type:DataTypes.STRING(50)
    }
},{
    createdAt:false,
    updatedAt:false
})

// Usuario.sync({force:true})

module.exports = Usuario
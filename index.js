const e = require('express')
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const { raw } = require('mysql2')
const { INTEGER, where } = require('sequelize')
const conn = require('./db/conn')
const Atividade = require('./models/Atividade')
const Usuario = require('./models/Usuario')

const PORT = 3000
const hostname = 'localhost'

let log = false
let nomeLog = 'teste'

/*--------------------------------------------------------------------------------------------*/
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
/*--------------------------------------------------------------------------------------------*/
app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs.engine())
/*--------------------------------------------------------------------------------------------*/
app.post('/atualizar', async(req,res)=>{
    const id =Number(req.body.id) 
    const atv = req.body.atv
    const msgA = 'Dados Atualizados'
    const msgB = 'Erro ao Atualizar'
    const msgC = 'Código não encontrado na base'

    const pesq = await Atividade.findOne({raw:true, where:{id:id}})
    if(pesq != null){
        const dados = {
            id:id,
            nome:atv
        }
        if((typeof id == 'number')&&(typeof atv == 'string')){
            await Atividade.update(dados, {where:{id:id}})
            res.render('atualiza', {log, nomeLog, msgA})
        }else{
            res.render('atualiza', {log, nomeLog, msgB})
        }
    }else{
        res.render('atualiza', {log, nomeLog, msgC})
    }
})

app.get('/atualizar', (req,res)=>{
    res.render('atualiza', {log, nomeLog})
})

app.post('/apagar', async(req,res)=>{
    const id = req.body.id
    const pesq = await Atividade.findOne({raw:true, where:{id:id}})
    const msgA = 'Atividade Apagada'
    const msgB ='Erro ao apagar atividade'
    if(pesq != null){
        await Atividade.destroy({where:{id:pesq.id}})
        res.render('apagar', {log, nomeLog, msgA})
    }else{
        res.render('apagar', {log, nomeLog, msgB})
    }
})

app.get('/apagar', (req,res)=>{
    res.render('apagar', {log, nomeLog})
})

app.post('/cadastrar', async(req, res)=>{
    const nome = req.body.nome
    const msgA = 'Atividade Cadastrada'
    await Atividade.create({nome})
    res.render('cadastro', {log, nomeLog, msgA})
})

app.get('/cadastrar', (req,res)=>{
    res.render('cadastro', {log, nomeLog})
})

app.get('/listar', async(req, res)=>{
    const dados = await Atividade.findAll({raw:true})
    console.log(dados)
    res.render('lista', {log, dados, nomeLog})
})

app.post('/logout', (req,res)=>{
    log = false
    res.render('home', {log, nomeLog})
})

app.post('/login', async(req, res)=>{
    const email = req.body.email
    const senha = req.body.senha
    const logErr = true
    const pesq = await Usuario.findOne({raw:true, where:{email:email}})
    if(pesq == null){
        console.log('Usuário não encontrado')
        res.render('home', {log, logErr})
    }else if(pesq.email == email && pesq.senha == senha){
        console.log('Usuário encontrado')
        log = true
        nomeLog = pesq.nome
        console.log(nomeLog)
        res.render('home', {log, nomeLog})
    }else{
        res.render('home', {log, logErr})
    }
})

app.get('/', (req, res)=>{
    res.render('home', {log, nomeLog})
})
/*--------------------------------------------------------------------------------------------*/
conn.sync().then(
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor Rodando tchê ${hostname}:${PORT}`)
    })
).catch((err)=>{
    console.error('Calma Netflixo '+ err)
})
const express = require('express');
const app = express();
const mysql = require("mysql"); 
const cors = require("cors"); // Serve para evitar problemas do back com o front


// Conexão com mysql

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "cadastro",
})

app.use(cors());
app.use(express.json());

// Pegando os dados para enviar para o banco de dados
app.post("/cadastro", (req,res) => {
    const {nome} = req.body;
    const {preco} = req.body;
    const {descricao} = req.body;


    // Executando o banco de dados

    let SQL = "INSERT INTO produtos (nome, preco, descricao) VALUES (?,?,?)";

    // Mandando os dados para o banco de dados

    db.query(SQL, [nome, preco, descricao], (err, result) => {
        if (err) console.log(err)
        else res.send(result)
    });
});

// Pegando os dados do banco de dados e enviando para a lista

app.get("/getListas", (req,res) => {
    let SQL = "SELECT * from produtos";
    db.query(SQL, (err,result) => {
        if(err) console.log(err)
        else res.send(result);
    });
});

// Enviando os dados editados para o banco de dados.

app.put("/editar", (req, res) => {
    const {id} = req.body;
    const {nome} = req.body;
    const {preco} = req.body;
    const {descricao} = req.body;
    const {datacriacao} = req.body;
    const {data_atualizacao} = req.body;

    let SQL = "UPDATE produtos SET nome = ?, preco = ? , descricao = ?, data_criacao = ?, data_atualizacao = ? WHERE id = ?";

    db.query(SQL,[nome, preco, descricao,datacriacao,data_atualizacao,id], (err, result) => {
        if (err) console.log(err)
        else res.send(result);
    });
});

// Deletando os dados

app.delete("/delete/:id", (req,res) => {
    const {id} = req.params;

    let SQL = "DELETE FROM produtos WHERE id = ?";

    db.query(SQL, id, (err, result) => {
        if (err) console.log(err)
        else res.send(result);
    })
});

// Testando a conexão com o banco de dados
/*
app.get("/", (req, res) => {
    let SQL =
    "INSERT INTO produtos (idprodutos, nome, preco, descricao) VALUES (1,'Blusa', '90', 'Blusa de manga de tamanho P')";
    db.query(SQL, (err, result) => {
        console.log(err);
    });
});*/


// get => pegar requisições

// post => enviar requisições

// delete => deletar arquivos

// put => editar arquivos

// Pegar duas funções requeste(req),tudo que vou pegar do servidor e resulte(), tudo que vai sair



// Rodando o servidor na porta 3001
app.listen(3001, () => {
    console.log("Servidor Rodando");
});


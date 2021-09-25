const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI);
var db = mongoose.connection;
db.on('error', console.log.bind(console, "Deu erro na conexão com o MongoDB 😐"));
db.once('open', function (callback) {
    console.log("Conexão com MongoDB tá suave 😎");
})

var app = express()

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/sign_up', function (req, res) {
    var name = req.body.name;
    var sign = req.body.sign;
    var createdAt = new Date();

    var data = {
        "name": name,
        "sign": sign,
        "createdAt": createdAt.toISOString(),
    }
    db.collection('entradas').insertOne(data, function (err, collection) {
        if (err) throw err;
        console.log("Novo cadastro na Database! 🤔");

    });

    return res.json({"message": "Cadastro realizado, seja bem-vindo(a)! 🤗"})
})

app.get('/', function (req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('index.html');
}).listen(port)

console.log(`Server Online: http://localhost:${port}`);


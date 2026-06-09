const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let pecas = require("./pecas.json");

app.get("/pecas/:id", (req, res) => {

    const peca = pecas.find(
        p => p.id === req.params.id
    );

    if (!peca) {
        return res.status(404).json({
            mensagem: "Peça não encontrada"
        });
    }

    res.json(peca);
});

app.put("/pecas/:id", (req, res) => {

    const peca = pecas.find(
        p => p.id === req.params.id
    );

    if (!peca) {
        return res.status(404).json({
            mensagem: "Peça não encontrada"
        });
    }

    peca.local = req.body.local;

    peca.horario =
new Date().toLocaleString("pt-BR");

    res.json(peca);
});

app.listen(3000, () => {
    console.log(
        "Servidor rodando na porta 3000"
    );
});
//framework: modelo de algo-o express é um framework de servidor node, é minimalista
//importa a biblioteca
const express = require("express"); //framework web

//cria a aplicação express
const app = express();

//atribuição da variável
app.use(express.json());

const PORT = 3000

const ALUNOS = [
    {   //aluno
        id: 1,
        nome: "Karina Souza",
        cor: "branco",
        idade: 16
    },
    {   //aluno
        id: 2,
        nome: "Marta Alves",
        cor: "vermelho",
        idade: 18
    },
    {   //aluno
        id: 3,
        nome: "Tiago Fitpaldi",
        cor: "verde",
        idade: 17
    }
]

        //req: require(requisita)-res: response(reposta)
app.get("/",(req, res)=>{
    res.json({
        mensagem: "Hello World"
    })
})

app.get("/alunos", (req, res)=>{
    res.json(ALUNOS);
})

app.get("/alunos/:id", (req, res)=>{
    const id = Number(req.params.id)
    console.log(`Valor recebido: ${id}`);

    const aluno = ALUNOS.filter( (aluno) => aluno.id === id)
            //length é quantidade: se aluno tiver objeto maior que 0, dá certo
    if(aluno.length > 0){ // >0 ou >=1 são a mesma coisa
        res.status(200).json(aluno)
    }else{
        res.status(404).json({msg: "Aluno não encontrado"})
    }
})

app.get("/alunos/cor/:cor", (req, res) => {
    const cor = req.params.cor;
    console.log(`Cor recebida: ${cor}`);
    const alunosFiltrados = ALUNOS.filter(
        (aluno) => aluno.cor.toLowerCase() === cor.toLowerCase()
    );
    if (alunosFiltrados.length > 0) {
        res.status(200).json(alunosFiltrados);
    }else {
        res.status(404).json({ msg: "Nenhum aluno encontrado com essa cor"})
    }
});

app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
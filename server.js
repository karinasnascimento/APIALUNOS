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

app.post("/alunos", (req, res) => {
    //quando colocou esses informações na chave{}, o body descompactou
    const {nome, cor, idade} = req.body;

    if(!nome || !cor || !idade){
        return res.status(400).json({ msg: "Nome, cor e idade são obrigatórios"})
    }

    // ALUNOS.length = 3
    // ALUNOS[2]
    // ALUNOS.length - 1
    // ALUNOS[2].id = 3
    // ALUNOS[2].id + 1
    // id = 4
    // let id = 0
    // if(ALUNOS.length > 0){
    //     id = ALUNOS[ALUNOS.length - 1.id + 1]
    // }else{
    //     id = 1
    // }

    const id = ALUNOS.length > 0 ? ALUNOS[ALUNOS.length - 1].id + 1 : 1
    const novoAluno = {
        id, nome, cor, idade
    }

    console.log(novoAluno)
    ALUNOS.push(novoAluno)
    res.status(201).json({ msg: "Aluno criado com sucesso"})
})

app.delete("/alunos/:id", (req, res) =>{
    const id = Number(req.params.id);
    const indice = ALUNOS.findIndex(aluno => aluno.id === id)

    if(indice === -1){
        return res.status(404).json({
            msg: "Aluno não encontrado ou já foi deletado"
        })
    }
    console.log(indice)
    ALUNOS.splice(indice, 1);
    res.status(204).json({msg: "Deletado com sucesso"});
})          //204: sucesso, mas não quero retorno

app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
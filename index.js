import express from "express";

const PORTA = 3000;

const server = express();
server.use(express.json());


let alunos = [
  {
    id: 1,
    nome: "Flavin Do Pneu",
    idade: "15",
    curso: "ADS"
  },
  {
    id: 2,
    nome: "Shawlin Matador de Porco",
    idade: "15",
    curso: "ADS"
  },
  {
    id: 3,
    nome: "Maria Linda no Escuro",
    idade: "15",
    curso: "EDS"
  }
];

let ultimoId = alunos.length;

server.get("/alunos", (request, response) => {
response.json(alunos);
});

server.post("/alunos", (request, response) => {
  console.log("Criando novo aluno: ", request.body);

  ultimoId++;
  request.body.id = ultimoId;

  alunos.push(request.body);

  response.sendStatus(201);
});

server.get("/alunos/:id", (request, response) => {
  const indexAluno = alunos.findIndex(aluno => aluno.id === Number(request.params.id)
  );

  if (indexAluno === -1) {
    response.sendStatus(404);
  } else {
    response.json(alunos[indexAluno]);
  }
});

server.patch("/alunos/:id", (request, response) => {
  const indexAluno = alunos.findIndex(aluno => aluno.id === Number(request.params.id));
  

  if (indexAluno === -1) {
    response.sendStatus(404);
  } else {
    request.body.id = alunos[indexAluno].id;

    alunos[indexAluno] = request.body;
    response.json(alunos[indexAluno]);
  }
});

server.delete("/alunos/:id", (request, response) => {
  const indexAluno = alunos.findIndex(aluno => aluno.id === Number(request.params.id));

  if (indexAluno === -1) {
    response.sendStatus(404);
  } else {
    alunos.splice(indexAluno, 1);
    response.sendStatus(200);
  }
});

server.listen(PORTA, () => console.log("Meu servidor tá funcionando na porta:", PORTA));

// Diretoria => nome do aluno e a média nas quatro materias
// Aluno => nome do aluno e se foi aprovado, reprovado ou esta de recuperação em cada um das quatro matérias
// Pais => relatar apenas se o aluno foi aprovado, reprovado ou esta de recuperação
// aprovado >= 7 recuperação < 7 e >=5 reprovado > 5
//  aprovado em todas materias passou de ANO
// recuperação em duas materias e aprovado nas demais  recuperacao
// recuperação em trêz matérias reprovado


// Diretoria => nome do aluno e a média nas quatro materias
// Aluno => nome do aluno e se foi aprovado, reprovado ou esta de recuperação em cada um das quatro matérias
// Pais => relatar apenas se o aluno foi aprovado, reprovado ou esta de recuperação
// aprovado >= 7 recuperação < 7 e >=5 reprovado > 5
//  aprovado em todas materias passou de ANO
// recuperação em duas materias e aprovado nas demais  recuperacao
// recuperação em trêz matérias reprovado



const statusDiretoria = {
  nome: "",
  materias: [],
};

const statusAluno = {
  nome: "",
  materias: [],
};

const statusPais = {
  nome: "",
  status: "",
};

const media = (total, valor, indice, array) => {
  const quantidadeNotas = array.length;
  const ultimo = quantidadeNotas - 1 === indice;
  const somatoria = total + valor;
  return ultimo ? somatoria / quantidadeNotas : somatoria;
};

const statusGeralAluno = (aluno) => {
  statusDiretoria.nome = aluno.nome;
  statusAluno.nome = aluno.nome;
  
  statusDiretoria.materias = [];
  statusAluno.materias = [];
  
  for (let materiaIndex = 0; materiaIndex < aluno.materias.length; materiaIndex++) {
    const nomeMateria = aluno.materias[materiaIndex].nome;
    const mediaMateria = aluno.materias[materiaIndex].notas.reduce(media).toFixed(2);
    
    const statusNota =
      mediaMateria >= 7
        ? "aprovado"
        : mediaMateria >= 5
        ? "recuperacao"
        : "reprovado";

    const resultadoMateria = { nome: nomeMateria, media: mediaMateria };
    const statusMateria = { nome: nomeMateria, status: statusNota };

    statusDiretoria.materias.push(resultadoMateria);
    statusAluno.materias.push(statusMateria);
  }
  const statusFinal = statusNotas(statusAluno);
  statusPais.status = statusFinal;
};


const statusNotas = (statusAluno) => {
  statusPais.nome = statusAluno.nome;
  
  const reprovado = statusAluno.materias.filter(materia => materia.status === 'reprovado').length;
  const recuperacao = statusAluno.materias.filter(materia => materia.status === 'recuperacao').length;

  if (reprovado > 0 || recuperacao >= 3) return "Reprovado";
  if (recuperacao > 0 && recuperacao <= 2) return "Recuperação";
  return "Aprovado";
};



const alunos = [
  {
    nome: "João",
    materias: [
      { nome: "Português", notas: [4.4, 5.6, 4, 2.2] },
      { nome: "Matemática", notas: [4.4, 5.0, 8.2, 7.0] },
      { nome: "Ciências", notas: [7.6, 8.0, 8.2, 6.3] },
      { nome: "Estudos Sociais", notas: [7.0, 7.6, 8.5, 9.2] },
    ],
  },
  {
    nome: "Marcos",
    materias: [
      { nome: "Português", notas: [7.4, 5.6, 5.0, 7.0] },
      { nome: "Matemática", notas: [4.4, 5.0, 8.2, 7.0] },
      { nome: "Ciências", notas: [7.6, 8.0, 8.2, 6.3] },
      { nome: "Estudos Sociais", notas: [7.0, 7.6, 8.5, 9.2] },
    ],
  },
  {
    nome: "Maria",
    materias: [
      { nome: "Português", notas: [7.4, 5.6, 10, 8.2] },
      { nome: "Matemática", notas: [7.4, 7.0, 8.2, 7.0] },
      { nome: "Ciências", notas: [7.6, 8.0, 8.2, 6.3] },
      { nome: "Estudos Sociais", notas: [7.0, 7.6, 8.5, 9.2] },
    ],
  },
];

const avaliarAlunos = (alunos) => {
  alunos.forEach(aluno => {
    statusGeralAluno(aluno);
    console.log("\nStatus Direção:", statusDiretoria);
    console.log("\nStatus Aluno:", statusAluno);
    console.log("\nStatus Pais:", statusPais);
  });
};

avaliarAlunos(alunos);
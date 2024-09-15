const trocarChaveValor = (objeto) => {
  const conjuntoChaveValor = Object.entries(objeto);

  const mapInvertido = new Map(conjuntoChaveValor.map(([chave, valor]) => [valor, chave]))


  return mapInvertido
};

const aluno1 = {
  nome: "João",
  idade: 16,
  peso: 98,
};

console.log(aluno1);
const resultado = (trocarChaveValor(aluno1));
for (const [chave, valor] of resultado) {
    console.log(`${chave}: ${valor}`)
}

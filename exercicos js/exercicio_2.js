const haParametro = (objeto, parametro) => {
    if (objeto.hasOwnProperty(parametro)) {
     
      copyObjeto ={...objeto}
      delete copyObjeto[parametro];
      console.log('Cópia do objeto')
      return copyObjeto;
    }
    console.log('Objeto')
    return objeto;   
  }

aluno1 = {
  nome: "João",
  idade: 16,
  materias: [
    { nome: "Português", notas: [4.4, 5.6, 4, 2.2] },
    { nome: "Matemática", notas: [4.4, 5.0, 8.2, 7.0] },
    { nome: "Ciências", notas: [7.6, 8.0, 8.2, 6.3] },
    { nome: "Estudos Sociais", notas: [7.0, 7.6, 8.5, 9.2] },
  ],
};
console.log(aluno1)
console.log(haParametro(aluno1, 'materias'));

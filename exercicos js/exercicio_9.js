const estados = ` SIGLA;NOME;CAPITAL;REGIÃO; 
AC;ACRE;RIO BRANCO;NORTE; 
PA;PARÁ;BELÉM;NORTE; 
RO;RONDÔNIA;PORTO VELHO;NORTE; 
RR;RORAIMA;BOA VISTA;NORTE; 
TO;TOCANTINS;PALMAS;NORTE; 
MA;MARANHÃO;SÃO LUIZ;NORDESTE; 
PB;PARAÍBA;JOÃO PESSOA;NORDESTE; 
PE;PERNAMBUCO;RECIFE;NORDESTE; 
PI;PIAUÍ;TEREZINA;NORDESTE; 
RN;RIO GRANDE DO NORTE;NATAL;NORDESTE; 
SE;SERGIPE;ARACAJÚ;NORDESTE; 
GO;GOIÁS;GOIÂNIA;CENTRO-OESTE; 
MS;MATO GROSSO DO SUL;CAMPO GRANDE;CENTRO-OESTE; 
MT;MATO GROSSO;CUIABÁ;CENTRO-OESTE; 
ES;ESPÍRITO SANTO;VITÓRIA;SUDESTE; 
MG;MINAS GERAIS;BELO HORIZONTE;SUDESTE; 
RJ;RIO DE JANEIRO;RIO DE JANEIRO;SUDESTE; 
SP;SÃO PAULO;SÃO PAULO;SUDESTE; 
RS;RIO GRANDE DO SUL;PORTO ALEGRE;SUL; 
SC;SANTA CATARINA;FLORIANÓPOLIS;SUL; 
AM;AMAZONAS;MANAUS;NORTE; 
AP;AMAPÁ;MACAPÁ;NORTE; 
AL;ALAGOAS;MACEIÓ;NORDESTE; 
BA;BAHIA;SALVADOR;NORDESTE; 
CE;CEARÁ;FORTALEZA;NORDESTE; 
PR;PARANÁ;CURITIBA;SUL; `

// array de objetos {[ac, acre, rio Branco, norte]}
// funcao pra retornar estados de uma região
// função que retorna o nome atravez da sigla

const estadosSplit = estados.split('\n');

//console.log(estadosSplit)

function objetos(array) {
  const estadosAtual = [];
  for (let i = 1; i < array.length; i++) {
    estadosAtual.push([array[i]]);
    estadosObjetos = estadosAtual.split(';')
  }

  return estadosObjetos;
}

function regioes(estadosObjetos, regiao){
    const estadoRegiao = []
    for(let i = 0; i < estadosObjetos.length - 1; i++){
        if(regiao === estadosObjetos[i][3] ){
            estadoRegiao.push(estadoRegiao)
            console.log(estadoRegiao)
        }
    }
}

const data = (objetos(estadosSplit));
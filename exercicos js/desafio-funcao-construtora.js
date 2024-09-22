
function Produto (nome, preco, desconto = 0){
    this.nome = nome
    this.preco = preco
    this.desconto = desconto

    this.precoFinal = () =>{
        const novoPreco = this.preco * (1 - this.desconto / 100)
        return novoPreco
    }


}

const p1 = new Produto('camiseta', 100, 15)
const p2 = new Produto ('bermuda', 180, 25)
const p3 = new Produto ('luva', 100)

p1.nome = 'camisa'


function imprimir(produto) {
    const nomeFormatado = produto.nome.padEnd(15, ' '); // Define um limite de caracteres para a coluna "nome"
    const precoFormatado = produto.preco.toFixed(2).padStart(8, ' '); // Formata o preço cheio
    const precoFinalFormatado = produto.precoFinal().toFixed(2).padStart(8, ' '); // Formata o preço com desconto

    console.log(`Produto: ${nomeFormatado}\tPreço cheio: R$ ${precoFormatado}\tPreço com desconto: R$ ${precoFinalFormatado}`);
}

imprimir(p2)
imprimir(p1)
imprimir(p3)




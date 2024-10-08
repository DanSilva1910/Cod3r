class jogador {
    constructor(simbolo){
        this.simbolo = simbolo
    }
}

class jogoDaVelha {
    constructor(jogador1 = new jogador('X'),
                jogador2 = new jogador('O')){
                    this.jogador1 = jogador1
                    this.jogador = jogador2
                    this.jogadorAtual = jogador1
                    this.tamanho = 3
                    this.tabuleiro = this.#iniciarTabuleiro()
                }

            #iniciarTabuleiro(){
                return Array(this.tamanho).fill(0)
                .map(()=> Array(this.tamanho).fill(null))
            }

            toString(){
                let matriz = this.tabuleiro
                    .map(linha => linha.map(posicao => posicao ?? '-')
                    .join(' ')).join('\n')
                return matriz

            }

}

const jogo = new jogoDaVelha()
console.log(jogo.toString())
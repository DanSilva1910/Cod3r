class jogador {
    constructor(simbolo){
        this.simbolo = simbolo
    }
}
 class jogada {
    constructor(linha, coluna){
        this.linha = linha
        this.coluna = coluna
    }

    get valida(){
        return this.linha > 0 && this.coluna > 0
    }
 }
class jogoDaVelha {
    constructor(jogador1 = new jogador('X'),
                jogador2 = new jogador('O')){
                    this.jogador1 = jogador1
                    this.jogador2 = jogador2
                    this.jogadorAtual = jogador1
                    this.tamanho = 3
                    this.tabuleiro = this.#iniciarTabuleiro()
                    this.vencedor = null
                }

            #iniciarTabuleiro(){
                return Array(this.tamanho).fill(0)
                .map(()=> Array(this.tamanho).fill(null))
            }

            jogar(jogada){

                this.#processarJogada(jogada)
            }

            #processarJogada(jogada){
                if(!this.#jogadaValida(jogada)) return;  
            
                this.#adicionar(jogada);
            
                if(this.#conquitouVitoria(jogada)){
                    this.vencedor = this.jogadorAtual.simbolo;
                    return;
                } else if (this.#finalizouComEmpate()) {  
                    
                    this.vencedor = '-';
                    return;
                }
            
                this.#trocarJogador();
            }

            #jogadaValida(jogada){
                if(!jogada.valida) return false


                let {linha, coluna } = jogada

                if(linha > this.tamanho || coluna > this.tamanho) return false

                if(this.#ocupado(jogada)) return false
                
                if(this.vencedor) return false 

                return true

            }

            #ocupado(jogada){
               let {linha, coluna} = jogada
               return this.#campo(linha, coluna) !== null
            }
            #campo(linha, coluna){
                return this.tabuleiro[linha - 1][coluna - 1]
            }




            #trocarJogador(){
                this.jogadorAtual = 
                    this.jogadorAtual.simbolo === this.jogador1.simbolo ?
                    this.jogador2: this.jogador1
            }

            #finalizouComEmpate() {
                let espacosVazios = this.tabuleiro
                    .flat()
                    .filter(campo => campo == null )
                return espacosVazios.length === 0
                
            }

            #conquitouVitoria(jogada){
                let {linha, coluna} = jogada
                let { tabuleiro, jogadorAtual} = this
                let tamanho = tabuleiro.length
                let indices = Array(tamanho).fill(0)
                    .map((_, i) => i + 1)
            
                let ganhouLinha = indices.every(
                    (i) => this.#campo(linha, i) === jogadorAtual.simbolo)
    
                let ganhouColuna = indices.every(
                    (i) => this.#campo(i, coluna) === jogadorAtual.simbolo)
        
                let ganhouDiag1 = indices.every(
                    (i) => this.#campo(i, i) === jogadorAtual.simbolo )
        
                let ganhouDiag2 = indices.every(
                    (i) => this.#campo(tamanho - i + 1, i) === jogadorAtual.simbolo )
            
                return ganhouLinha || ganhouColuna || ganhouDiag1 || ganhouDiag2
            }
            

            toString(){
                let matriz = this.tabuleiro
                    .map(linha => linha.map(posicao => posicao ?? '-')
                    .join(' ')).join('\n')
                return `${matriz}\n Vencedor: ${this.vencedor} `

            }

            #adicionar(jogada){
                let {linha, coluna} = jogada
                this.tabuleiro[linha - 1][coluna - 1] = this.jogadorAtual.simbolo


            }

}

const jogo = new jogoDaVelha()
jogo.jogar(new jogada(1, 1))
jogo.jogar(new jogada(1, 2))
jogo.jogar(new jogada(2, 3))
jogo.jogar(new jogada(2, 2))
jogo.jogar(new jogada(1, 3))
jogo.jogar(new jogada(3, 2))
jogo.jogar(new jogada(1, 1))
jogo.jogar(new jogada(3, 3))
jogo.jogar(new jogada(3, 2))
console.log(jogo.toString())
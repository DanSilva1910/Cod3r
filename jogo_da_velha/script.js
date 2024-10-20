class JogadorHumano {
	constructor(simbolo) {
		this.simbolo = simbolo;
		this.humano = true;
	}
}

class JogadorMinimax {
	constructor(simbolo) {
		this.simbolo = simbolo;
		this.humano = false;
	}

	jogar(tabuleiro) {
		let melhorJogada = this.minimax(tabuleiro, this.simbolo);
		if (!melhorJogada) {
			throw new Error("Nenhuma jogada válida encontrada.");
		}
		return melhorJogada; // Retorna a jogada válida
	}

	dificuldade(){
		let nivel = document.querySelector('#dificuldade')
		let nivelDificudade = +nivel.value
		return nivelDificudade
	}
    minimax(tabuleiro, jogadorAtual, profundidade = 0, profundidadeMaxima = 2) {

		profundidadeMaxima = this.dificuldade()

        let vencedor = this.#verificarVencedor(tabuleiro);
        if (vencedor) {
            if (vencedor === this.simbolo) return { pontuacao: 10 - profundidade };
            else if (vencedor === "-") return { pontuacao: 0 };
            else return { pontuacao: -10 + profundidade };
        }
    
        if (profundidade >= profundidadeMaxima) {
            return { pontuacao: 0 }; // Retorna um valor neutro se a profundidade máxima for atingida
        }
    
        let jogadasDisponiveis = this.#obterJogadasValidas(tabuleiro);
        let melhoresJogadas = [];
    
        for (let jogada of jogadasDisponiveis) {
            let tabuleiroSimulado = this.#simularJogada(tabuleiro, jogada, jogadorAtual);
            let proximoJogador = jogadorAtual === this.simbolo ? "X" : this.simbolo; // Troca de jogador
            let resultado = this.minimax(tabuleiroSimulado, proximoJogador, profundidade + 1, profundidadeMaxima);
            jogada.pontuacao = resultado.pontuacao;
            melhoresJogadas.push(jogada);
        }
    
        if (jogadorAtual === this.simbolo) {
            return melhoresJogadas.reduce((melhor, jogada) =>
                jogada.pontuacao > melhor.pontuacao ? jogada : melhor
            );
        } else {
            return melhoresJogadas.reduce((melhor, jogada) =>
                jogada.pontuacao < melhor.pontuacao ? jogada : melhor
            );
        }
    }
    
    
    


    

	#obterJogadasValidas(tabuleiro) {
		let jogadas = [];
		for (let linha = 0; linha < tabuleiro.length; linha++) {
			for (let coluna = 0; coluna < tabuleiro[linha].length; coluna++) {
				if (tabuleiro[linha][coluna] === null) {
					jogadas.push({ linha: linha + 1, coluna: coluna + 1 });
				}
			}
		}
		return jogadas;
	}

	#simularJogada(tabuleiro, jogada, jogadorAtual) {
		let novoTabuleiro = tabuleiro.map((linha) => linha.slice());
		novoTabuleiro[jogada.linha - 1][jogada.coluna - 1] = jogadorAtual;
		return novoTabuleiro;
	}

	#verificarVencedor(tabuleiro) {
		const tamanho = tabuleiro.length;
		const winningCombinations = [];
		
		// Linhas
		for (let i = 0; i < tamanho; i++) {
			winningCombinations.push(Array.from({ length: tamanho }, (_, j) => [i, j]));
		}
		
		// Colunas
		for (let i = 0; i < tamanho; i++) {
			winningCombinations.push(Array.from({ length: tamanho }, (_, j) => [j, i]));
		}
		
		// Diagonais
		winningCombinations.push(Array.from({ length: tamanho }, (_, i) => [i, i])); // Diagonal principal
		winningCombinations.push(Array.from({ length: tamanho }, (_, i) => [i, tamanho - 1 - i])); // Diagonal secundária
	
		// Verifica as combinações de vitória
		for (let combo of winningCombinations) {
			const simbolos = combo.map(([linha, coluna]) => tabuleiro[linha][coluna]);
			
			// Se todos os símbolos forem iguais e não forem nulos, temos um vencedor
			if (simbolos.every((simbolo) => simbolo && simbolo === simbolos[0])) {
				return simbolos[0]; // Retorna o símbolo do vencedor
			}
		}
	
		return tabuleiro.flat().includes(null) ? null : "-"; // Retorna "-" se empatou
	}
	
}  

class Jogada {
	constructor(linha, coluna) {
		this.linha = linha;
		this.coluna = coluna;
	}

	get valida() {
		return this.linha > 0 && this.coluna > 0;
	}
	get invalida() {
		return !this.valida;
	}
}
class JogoDaVelha {
	constructor(
		jogador1 = new JogadorHumano("X"),
		jogador2 = this.definirJogador2(),
		tamanho = 3
	) {
		this.jogador1 = jogador1;
		this.jogador2 = jogador2;
		this.tamanho = tamanho;
		this.zerar();
	}

	definirJogador2() {
		let tipoJogador = document.getElementById('jogadores').value; 

		if (tipoJogador === 'jogadorHumano') {
			return new JogadorHumano("O");
		} else {
			return new JogadorMinimax("O");
		}
	}


	#iniciarTabuleiro() {
		return Array(this.tamanho)
			.fill(0)
			.map(() => Array(this.tamanho).fill(null));
	}

	jogar(jogada) {
		if (this.jogadorAtual.humano) {
			this.#processarJogada(jogada);
		}

		while (!this.vencedor && !this.jogadorAtual.humano) {
			let jogada = this.jogadorAtual.jogar(this.tabuleiro);
			this.#processarJogada(jogada);
		}
	}

	#processarJogada(jogada) {
		if (!this.#jogadaValida(jogada)) return;

		this.#adicionar(jogada);
		if (this.#conquistouVitoriaComJogada(jogada)) {
			this.vencedor = this.jogadorAtual.simbolo;
			return;
		} else if (this.#finalizouComEmpate()) {
			this.vencedor = "-";
			return;
		}
		this.#trocarJogador();
	}

	#jogadaValida(jogada) {
		if (jogada.invalida) return false;
		let { linha, coluna } = jogada;
		if (linha > this.tamanho || coluna > this.tamanho) return false;
		if (this.#ocupado(jogada)) {
			return false;
		}
		if (this.vencedor) {
			return false;
		}
		return true;
	}

	#ocupado(jogada) {
		let { linha, coluna } = jogada;
		return this.#campo(linha, coluna) !== null;
	}

	#campo(linha, coluna) {
		return this.tabuleiro[linha - 1][coluna - 1];
	}

	#trocarJogador() {
		this.jogadorAtual =
			this.jogadorAtual.simbolo === this.jogador1.simbolo
				? this.jogador2
				: this.jogador1;
	}

	#adicionar(jogada) {
		let { linha, coluna } = jogada;
		this.tabuleiro[linha - 1][coluna - 1] = this.jogadorAtual.simbolo;
	}

	#finalizouComEmpate() {
		let espacosVazios = this.tabuleiro.flat().filter((campo) => campo === null);
		return espacosVazios.length === 0;
	}

	#conquistouVitoriaComJogada(jogada) {
		let { linha, coluna } = jogada;
		let { tabuleiro, jogadorAtual } = this;
		let tamanho = tabuleiro.length;
		let indices = Array(tamanho)
			.fill(0)
			.map((_, i) => i + 1);

		let ganhouEmLinha = indices.every(
			(i) => this.#campo(linha, i) === jogadorAtual.simbolo
		);

		let ganhouEmColuna = indices.every(
			(i) => this.#campo(i, coluna) === jogadorAtual.simbolo
		);

		let ganhouEmDiag1 = indices.every(
			(i) => this.#campo(i, i) === jogadorAtual.simbolo
		);

		let ganhouEmDiag2 = indices.every(
			(i) => this.#campo(tamanho - i + 1, i) === jogadorAtual.simbolo
		);

		return ganhouEmLinha || ganhouEmColuna || ganhouEmDiag1 || ganhouEmDiag2;
	}

	zerar() {
		this.tabuleiro = this.#iniciarTabuleiro();
		this.jogadorAtual = this.jogador1;
		this.vencedor = null;
	}

	toString() {
		let matriz = this.tabuleiro
			.map((linha) => linha.map((posicao) => posicao ?? "-").join(" "))
			.join("\n");
		let quemVenceu = this.vencedor ? ` Vencedor: ${this.vencedor}` : "";
		return `${matriz} \n ${quemVenceu}`;
	}

	status() {
		if (this.vencedor === "-") {
			return "Empate!!!";
		} else if (this.vencedor) {
			return `${this.vencedor} venceu!!`;
		} else {
			return `É a vez de ${this.jogadorAtual.simbolo}`;
		}
	}
}



class JogoDaVelhaDOM {
	constructor(tabuleiro, informacoes) {
		this.tabuleiro = tabuleiro;
		this.informacoes = informacoes;
	}

	inicializar(jogo) {
		this.jogo = jogo;
		this.#criarTabuleiro();
		this.#deixarTabuleiroJogavel();
	}

	#deixarTabuleiroJogavel() {
		const posicoes = this.tabuleiro.getElementsByClassName("posicao");
		for (let posicao of posicoes) {
			posicao.addEventListener("click", (e) => {
				if (this.jogo.vencedor) {
					return;
				}
				let posicaoSelecionada = e.target.attributes;
				let linha = +posicaoSelecionada.linha.value;
				let coluna = +posicaoSelecionada.coluna.value;
				// console.log(`Cliquei em ${linha} ${coluna}`);
				this.jogo.jogar(new Jogada(linha, coluna));
				this.informacoes.innerText = this.jogo.status();
				// console.log(this.jogo.toString());
				this.#imprimirSimbolos();
			});
		}
	}

	#imprimirSimbolos() {
		let { tabuleiro } = this.jogo;
		let qtdLinhas = tabuleiro.length;
		let qtdColunas = tabuleiro[0].length;
		let posicoes = this.tabuleiro.getElementsByClassName("posicao");
		for (let linha = 0; linha < qtdLinhas; linha++) {
			for (let coluna = 0; coluna < qtdColunas; coluna++) {
				let indiceDaInterface = linha * qtdLinhas + coluna;
				posicoes[indiceDaInterface].innerText = tabuleiro[linha][coluna];
			}
		}
	}

	#criarTabuleiro() {
		const tamanho = this.jogo.tamanho;
		let posicoes = [];
		for (let linha = 1; linha <= tamanho; linha++) {
			const colunas = this.#criarLinhaTabuleiro(linha, tamanho);
			posicoes.push(...colunas);
		}
		this.tabuleiro.innerHTML = [...posicoes].join("");
		this.tabuleiro.style.gridTemplateColumns = `repeat(${tamanho},1fr)`;
	}

	#criarLinhaTabuleiro(linha, tamanho) {
		let colunas = [];
		for (let coluna = 1; coluna <= tamanho; coluna++) {
			let classes = "posicao ";
			if (linha === 1) {
				classes += "posicao-cima ";
			} else if (linha === tamanho) {
				classes += "posicao-baixo ";
			}

			if (coluna === 1) {
				classes += "posicao-esquerda ";
			} else if (coluna === tamanho) {
				classes += "posicao-direita ";
			}

			const elemento = `<div class="${classes}" linha=${linha} coluna=${coluna}>
								</div>`;
			colunas.push(elemento);
		}
		return colunas;
	}

	zerar() {
		this.jogo.zerar();
		let posicoes = document.getElementsByClassName("posicao");
		[...posicoes].forEach((posicao) => (posicao.innerText = ""));
		this.informacoes.innerText = this.jogo.status();
	}
}
(function () {
	const botaoIniciar = document.getElementById("iniciar");
	const informacoes = document.getElementById("informacoes");
	const tabuleiro = document.getElementById("tabuleiro");
	const inputTamanho = document.getElementById("tamanho");
	const seletorJogadores = document.getElementById("jogadores");
	const seletorDificuldade = document.getElementById("dificuldade");

	// Função para definir o jogador2 com base na seleção do tipo de jogo
	const definirJogador2 = () => {
		const tipoJogador = seletorJogadores.value; 
		const dificuldade = seletorDificuldade.value;
		

		if (tipoJogador === "jogadorHumano") {
			
			return new JogadorHumano("O");
		} else {
		
			return new JogadorMinimax("O", dificuldade);
		}
	};

	// Função para iniciar um novo jogo com o tamanho do tabuleiro definido
	const novoJogo = (tamanho) => {
		const jogador1 = new JogadorHumano("X"); 
		const jogador2 = definirJogador2(); 
		const jogo = new JogoDaVelha(jogador1, jogador2, tamanho); 
		return jogo;
	};

	// Inicializa o objeto DOM responsável por manipular a interface
	const jogoDOM = new JogoDaVelhaDOM(tabuleiro, informacoes);
	jogoDOM.inicializar(novoJogo(+inputTamanho.value)); 

	// Atualiza o jogo quando o tamanho do tabuleiro for alterado
	inputTamanho.addEventListener("input", () => {
		let tamanho = +inputTamanho.value;
		jogoDOM.inicializar(novoJogo(tamanho)); 
	});

	// Reinicia o jogo quando o botão iniciar é clicado
	botaoIniciar.addEventListener("click", () => {
		jogoDOM.zerar(); 
		jogoDOM.inicializar(novoJogo(+inputTamanho.value));
	});

		seletorJogadores.addEventListener("click", () => {
		const tipoJogador = seletorJogadores.value;
		console.log(tipoJogador)
		const dificuldade = document.getElementById('dificuldade-container')

		if (tipoJogador === "jogadorAleatorio") {
			dificuldade.classList.remove('invisivel')
		} else {
			dificuldade.classList.add('invisivel')
		}
	});
})();

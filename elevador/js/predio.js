(function () {

    //--------------------- Pavimentos

    function criarTerreo(){
        const janela = document.createElement('div')
        janela.classList.add('janela')
        
        const terreo = document.createElement('div')
        terreo.setAttribute('andar', 't')
        terreo.classList.add('terreo')
        terreo.appendChild(janela)
        
        return terreo
    }
    
    
    function criarAndar(numero){
          
            const porta = document.createElement('div')
            porta.classList.add('porta')
            const andar = document.createElement('div')
            andar.setAttribute('andar', numero)
            andar.classList.add('andar')
            andar.appendChild(porta)

            return andar
    }

    function criarPavimentos(){
        const pavimento = document.querySelectorAll('[andares]')
        pavimento.forEach(el => {
        const qtde = +el.getAttribute('andares')
            for (let i = qtde; i > 0 ; i--) {
                el.appendChild(criarAndar(i))
    
            }
    
            el.appendChild(criarTerreo())
    
        })
    
    }
    criarPavimentos()



    // ----------------------- Elevador

    
    function criarElevador(){
        const poco = document.querySelector('.poco')
        const elevador = document.createElement('div')
        elevador.classList.add('elevador')
        elevador.style.height = obterTamanhoElevador() + 'px'
        poco.appendChild(elevador)
    }
    
    function iniciarMovimentacao(){
        const elevador = document.querySelector('.elevador')
        elevador.setAttribute('em-movimentacao', '')
        console.log('movimentooo')
    }
    
    function finalizarMovimentacao(){
        const elevador = document.querySelector('.elevador')
        elevador.removeAttribute('em-movimentacao')
        console.log('fim do movimento')
    }

    function emMovimentacao() {
        const elevador = document.querySelector('.elevador');
        return elevador.hasAttribute('em-movimentacao'); 
    }

    function obterTamanhoElevador(){
        const terreo = document.querySelector('[andar="t"]')
       return terreo.offsetHeight 
    }
    
    function obterPosicaoAtual(){
        const elevador = document.querySelector('.elevador')
        return +elevador.style.bottom.replace('px', '')
    }

    function atualizarMostrador(texto){
        const mostrador = document.querySelector('.mostrador')
        mostrador.innerHTML = texto
    }

    function destacarIniciado(comando){
        const botao = document.querySelector(`[destino = '${comando}']`)
        botao.classList.add('destaque')
    }
    function destacarFinalizado(comando){
        const botao = document.querySelector(`[destino = '${comando}']`)
        botao.classList.remove('destaque')
    }

    function moverElevadorPara(andar){
        if(emMovimentacao()) return

        iniciarMovimentacao()
        destacarIniciado(andar)
        const numero = andar === 't' ? 0 : +andar
        const elevador = document.querySelector('.elevador')

        const posicaoInicial = obterPosicaoAtual()
        const posicaoFinal =  (numero * obterTamanhoElevador())

        const subindo = posicaoFinal > posicaoInicial

        let temporizador = setInterval(() => {
            const novaPosicao = obterPosicaoAtual() + (subindo ? +10 : -10 )
            const terminou = subindo ? novaPosicao >= posicaoFinal : novaPosicao <= posicaoFinal
            elevador.style.bottom = (terminou ? posicaoFinal : novaPosicao) + 'px'
            atualizarMostrador(subindo ? 'Subindo' : 'Descendo')

            if (terminou){   
                clearInterval(temporizador)
                atualizarMostrador(andar === 't' ? ' Terreo' : `${andar} Andar` )
                finalizarMovimentacao()
                destacarFinalizado(andar)
            }
        }, 30)

    }

    function aplicarControlesElevador(){
        const botoes = document.querySelectorAll('[destino]')
        botoes.forEach(botao => {
            const destino = botao.getAttribute('destino')
            botao.onclick = function (){
                moverElevadorPara(destino)
            }
        })
    }

    criarElevador()
   aplicarControlesElevador()

})()
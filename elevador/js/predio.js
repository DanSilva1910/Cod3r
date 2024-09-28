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

    function obterTamanhoElevador(){
        const terreo = document.querySelector('[andar="t"]')
       return terreo.clientHeight
        

    }
    

    function criarElevador(){
        const poco = document.querySelector('.poco')
        const elevador = document.createElement('div')
        elevador.classList.add('elevador')
        elevador.style.height = `${obterTamanhoElevador()}px`
        poco.appendChild(elevador)
    }

    criarElevador()

})()
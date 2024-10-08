(function(){
    const entrada = document.getElementById('entrada-dados')
    const saida = document.getElementById('saida-dados')
    let numero = document.getElementById('numero')
    const converter = document.getElementById('botao')
    const resposta = document.getElementById('resposta-dados')
  
        converter.addEventListener('click', () => {
            const input = +numero.value
            const saidaSeletor = +saida.value
            const entradaSeletor = +entrada.value

            resposta.classList.remove('invisivel')

            if(saidaSeletor === entradaSeletor){
                resposta.classList.remove('invisivel')
                return resposta.innerHTML = input
            }

            if(entradaSeletor === 10){
                resposta.classList.remove('invisivel')
                return resposta.innerHTML = input.toString(saidaSeletor)
            } else{
                resposta.classList.remove('invisivel')
                const baseDecimal = parseInt(input, entradaSeletor)
                return resposta.innerHTML = baseDecimal.toString(saidaSeletor)
            }


            
            // numeroConvertido = input.toString(saidaSeletor)
            // numeroConvertido   
            // console.log(numeroConvertido)
            // resposta.classList.remove('invisivel')
            // resposta.innerHTML = numeroConvertido
            
        })
    


    
    
    
    
    
    
})()
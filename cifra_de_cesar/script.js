
(function(){

    const alfabeto = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    
    function selecionarAlfabeto(arr) {
        const el = document.getElementById('letras-alfabeto');
        for (let i = 0; i < arr.length; i++) {
            const letra = document.createElement('option'); 
            letra.textContent = arr[i]; 
            letra.setAttribute('value', i);
            el.appendChild(letra);
        }
    }

    function pegaTexto(){
        const texto = document.getElementById('para-codificar')
        const botao = document.getElementById('botao')
        const letra = document.getElementById('letras-alfabeto')
        const resposta = document.getElementById('texto-codificado')
        botao.addEventListener('click',() => {
            let textoCriptografar = texto.value
            let deslocamento = +letra.value

            let criptografado = criptografar(textoCriptografar, deslocamento)
            resposta.classList.remove('invisivel')
            resposta.innerHTML = criptografado


            console.log(textoCriptografar)
            console.log(deslocamento)
        })


    }

    function criptografar(texto, deslocamento){
        const textoMaiusculo = texto.toUpperCase().split('')
        let textoCriptografado = []


        for(let i=0; i < textoMaiusculo.length; i++){
            let indiceDaLetra = alfabeto.indexOf(textoMaiusculo[i])
            if(indiceDaLetra >= 0){
                textoCriptografado.push(letraPorIndice(indiceDaLetra + deslocamento))
            } else {
                textoCriptografado.push(textoMaiusculo[i])
            }
        }
        
        return textoCriptografado.join('')
    }

    function letraPorIndice(indice){
        let indiceFinal
        if(indice >= 0){
            indiceFinal = indice % alfabeto.length
        } else {
            indiceFinal = alfabeto.length + indice % alfabeto.length
        }

        return alfabeto[indiceFinal]
    }

    selecionarAlfabeto(alfabeto)
    pegaTexto()

})()
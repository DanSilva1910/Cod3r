
function areaFormasGeometricas(objeto){
    if(objeto.tipo == 'circulo'){
        if (objeto.raio == undefined || null) return 0
        return Math.PI * objeto.raio ** 2
       
    }
    if (objeto.base && objeto.altura == undefined || null) return 0
    
    if(objeto.tipo == 'triangulo'){
        return (objeto.base * objeto.altura) / 2
    }
    if(objeto.tipo == 'retangulo'){
        return objeto.base * objeto.altura
    }

}

const circulo = {tipo: 'circulo', raio: 4.5}
const triangulo = {tipo: 'triangulo', base: 4.5, altura:7.8}
const retangulo = {tipo: 'retangulo', base: 8.2, altura:8}

console.log(areaFormasGeometricas(circulo))
console.log(areaFormasGeometricas(triangulo))
console.log(areaFormasGeometricas(retangulo))
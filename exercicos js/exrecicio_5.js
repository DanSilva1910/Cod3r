const arrayA = [1, 2, 3, 4]
const arrayB = [5, 6, 7, 8, 10]

const distributiva = (arrayA, arrayB) => {
    const arrayAxB = []
    for (const elementA of arrayA) {
        for (const elementB of arrayB) {
            const resultado = elementA*elementB
            arrayAxB.push(resultado)
        }
    }

    return arrayAxB
}

console.log(distributiva(arrayA, arrayB))
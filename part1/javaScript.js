// Variables

console.log("Variables")
const x = 1
let y = 5

console.log(x, y)
y += 10
console.log(x, y)
y ='sometext'
console.log(x, y)
// x = 4  //Error: x es una constante
console.log('------------------')

//Arrays
console.log("Arrays")

const t = [1, -1, 3]
//push agrega un elemento al final del array
t.push(5)

console.log(t.length)
console.log(t[1])

//forEach
//forEach ejecuta una función para cada elemento del array
t.forEach(value => {
    console.log(value)
})

//concat
//concat crea un nuevo array sin modificar el original

const d = [1, -1, 3]

const d2 = d.concat(5) //crea un nuevo array

console.log(d)
console.log(d2)

// map
// map crea un nuevo array aplicando una función a cada elemento del array original
const q = [1, 2, 3]

const m1 = q.map(value => value * 2)
console.log(m1)

const m2 = q.map(value => '<li>' + value + '</li>')
console.log(m2)

//asignación destructiva
//asignación destructiva permite asignar valores de un array a variables individuales
const v = [1, 2, 3, 4, 5]

const [fisrt, second, ...rest]= v //rest es un array con el resto de los elementos
console.log(fisrt, second)
console.log(rest)
console.log('------------------')

//Objetos
console.log("Objetos")

const object1 = {
    name:'Arto Hellas',
    age: 35,
    education: 'PhD'
}
const object2 = {
    name:'Full Stack web application development',
    level: 'intermediate studies',
    size: 5,
}

const object3 = {
    name: {
        first: 'Dan',
        last: 'Abramov',
    },
    grades: [2, 3, 5, 3],
    department: 'Stanford University',
}

//hacer referencia a una propiedad de un objeto
console.log(object1.name)
const fieldName = 'age'
console.log(object1[fieldName])

//agregar propiedades a un objeto
object1.address = 'Helsinkin'
object1['secret number'] = 12341

console.log('----------------')

//Funciones
console.log("Funciones")

//Funciones de flecha
const sum = (p1, p2) => {
    console.log(p1)
    console.log(p2)
    return p1 + p2
}

const result = sum(1, 5)
console.log(result)

//Funciones de flecha con un solo parámetro
//Si la función tiene un solo parámetro se pueden omitir los paréntesis
const square = p => {
    console.log(p)
    return p * p
}

//Funcion con una sola expresión
//Si la función tiene una sola expresión se pueden omitir las llaves y el return
const square2 = p => p * p
console.log(square2(5))

// util cuando se utiliza map
const tSquare = t.map(p => p * p)
console.log(tSquare)

//declaración de función
function product(a, b) {
    return a * b
}

const rst = product(2, 6)
console.log(rst)

//exrpesión de función
const average = function(a, b) {
    return (a + b)/2
}

const rst3 = average(2, 5)
console.log(rst3)



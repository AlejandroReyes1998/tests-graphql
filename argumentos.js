//Ejemplo de llamado con argumentos

const express = require("express")
const { createHandler } = require("graphql-http/lib/use/http")
const { buildSchema } = require("graphql")

// Se construye la consulta con base a la petición recibida
/*
    Ejemplo de schema
    type Query {
        rollDice(numDice: Int!, numSides: Int): [Int] 
            Parametro obligatorio   Parametro opcional : Devuelve arreglo
    }


    Ejemplo de envío de consulta
        {
            rollDice(numDice: 3, numSides: 6)
        }
*/
const schema = buildSchema(`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`)

// Se asocia la función con base a los parámetros que son enviados
const root = {
  rollDice: ({ numDice, numSides }) => {
    let output = []
    for (let i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)))
    }
    return output
  },
}

const app = express()
app.use(
  "/arguments",
  createHandler({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)
app.listen(4000)
console.log("Running a GraphQL API server at localhost:4000/arguments")
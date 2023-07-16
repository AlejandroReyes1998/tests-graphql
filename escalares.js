//Llamado a API con tipos de datos definidos

const express = require("express")
const { createHandler } = require("graphql-http/lib/use/http")
const { buildSchema } = require("graphql")
const { uuid } = require('uuidv4');

// Graphql tiene soporte para tipos de datos escalares de tipo String, Int, Float, Boolean, e ID, 
/*
  Float! <- indica que es un campo que nunca será null
  [Int] <- indica que es un arreglo
*/
const schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
    booleanTest: Boolean
    idTest: ID
  }
`)

// Funciones para cada query asociado añ tipo de dato
const root = {
  //STRING
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? "Take it easy" : "Salvation lies within"
  },
  //Float
  random: () => {
    return Math.random()
  },
  //Arreglo de enteros
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6))
  },
  //Boolean
  booleanTest: () => {
    const num = Math.random() * 100
    return num % 2 === 0
  },
  //ID (que es similar al formato de identificador uuid)
  idTest: () => {
    return uuid();
  },
}

const app = express()
app.use(
  "/scalars",
  createHandler({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)
app.listen(4000)
console.log("Running a GraphQL API server at localhost:4000/scalars")
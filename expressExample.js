const express = require("express")
//Se hace import de esta librería en vez de la librería indicada en el tutorial debido a que esta ya no cuenta con soporte
const { createHandler } = require("graphql-http/lib/use/http")
const { buildSchema } = require("graphql")

// Construcción del Schema con base a notación de Graphql
const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// Función para definir un endpoint definitivo hacia donde van a llegar todas las consultas
const root = {
  hello: () => {
    return "Hello world!"
  },
}

//Se manda a llamar el programa con el query que definimos previamente, y lo asociamos con el endpoint /graphql
const app = express()
app.use(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)

app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")
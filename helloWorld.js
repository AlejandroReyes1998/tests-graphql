const { graphql, buildSchema } = require("graphql")

// Construcción del Schema con base a notación de Graphql
const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// Función para definir un endpoint definitivo hacia donde van a llegar todas las consultas
const rootValue = {
  hello: () => {
    return "Hello world!"
  },
}

//Se manda a llamar el programa con el query que definimos previamente
graphql({
  schema,
  source: "{ hello }",
  rootValue,
}).then(response => {
  console.log(JSON.stringify(response))
})
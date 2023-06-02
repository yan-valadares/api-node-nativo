import http from 'node:http' // modulo interno do node
import { json } from './middlewares/json.js' // quando utilizado o type 'module' no arquivo package.json, é necessário a indentificação do tipo do arquivo, nesse caso, o .js
import { routes } from './middlewares/routesList.js'
import { extractQueryParams } from './utils/extract-query-params.js'

// - HTTP 
//   - Método HTTP
//   - URL

// GET, POST, PUT, PATCH, DELETE

// GET - Buscar um recurso do back-end
// POST - Criar uma recurso no back-end
// PUT - Atualizar um recurno no back-end
// PATCH - Atualizar uma informação específica em um recurso no back-end
// DELETAE - Deletar um recurso do back-end

// GET /users - Buscando usuários do back-end
// POST / users - Criar um usuário no back-end

// Stateful - Aplicação que sempre terá uma informação sendo guardada em memória

// JSON - JavaScript Object Notation

// Cabeçalhos (Requisição/resposta) - Metadados

// HTTP Status Code

// Query Parameters: URL Stateful --> Filtros, paginação, não-obrigatórios
// http://localhost:3333/users?userId=1&name=Yan

// Route Parameters: Identificação de recursos
// GET http://localhost:3333/users/1 --> Busca o usuário com id 1
// DELETE http://localhost:3333/users/1 --> Deleta o usuário com id 1

// Request Body: Envio de informações de um formulário (passam pelo protocolo HTTPs)
// POST http://localhost:3333/users

const server = http.createServer (async (request, response) => {
    const { method, url } = request

    await json(request, response) // middleware

    //identificando qual a rota requerida
    const route = routes.find(route => {
        return route.method == method && route.path.test(url)
    })

    // executando o processo da rota requerida
    if(route){
        const routeParams = request.url.match(route.path)

        // Desestruturação
        const { query, ...params } = routeParams.groups

        request.params = params
        // caso não haja query parameters na requisição, para que não haja o retorno de undefined, há uma tratativa para que haja o retorno de uma query como obejto vazio
        request.query = query ? extractQueryParams(query) : {}

        return route.handler(request, response)
    }

    console.log(route)
    
    return response.writeHead(404).end()
})

server.listen(3333)
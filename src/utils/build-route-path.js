// users/:id

// regex é uma expressão regular,ou seja, uma forma de encontrar texto com uma forma específica em um acumulado de texto ou um texto muito maior
export function buildRoutePath(path){
    const routeParametersRegex = /:([a-zA-Z]+)/g
    // o $1 dentro das setas serve para a nomeção dinâmica dos grupos trazidos pela url
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

    // o ^ no começo do template strings serve como validação de que a string necessariamente começa com a Regex criada
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

    return pathRegex
}
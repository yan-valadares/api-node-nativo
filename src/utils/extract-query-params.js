// ?search=Yan

export function extractQueryParams(query){
    // substr -> elimina o primeiro caractere recebido, no caso o ?
    // split -> separa a string onde o elemento (no caso o &) aparece, formando duas ou mais strings a partir de uma string
    // reduce -> método que percorre o array e transforma em outra coisa qualquer, nesse caso um objeto
    return query.substr(1).split('&').reduce((queryParams, param) => {
        const [key, value] = param.split('=')

        queryParams[key] = value

        return queryParams
    }, {})
}
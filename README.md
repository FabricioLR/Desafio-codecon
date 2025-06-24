# Desafio Técnico: Performance e Análise de Dados via API

Desafio proposto em [Desafio Técnico: Performance e Análise de Dados via API](https://github.com/codecon-dev/desafio-1-1s-vs-3j/)

## Objetivo
Criar uma API que recebe um arquivo JSON com 100.000 usuários e oferece endpoints performáticos e bem estruturados para análise dos dados.

## Testando a solução

Inicie o servidor feito em NodeJs
```
$npm run start
Server is running on http://localhost:8000
```

Execute o script para fazer o teste de requisições
```
$npm run test
response status:  200  content:  {
  timestamp: '2025-06-24T13:07:13.849Z',
  execution_time_ms: 508,
  result: {
    '/users': { response: 100000, execution_time_ms: 405 },
    '/superusers': { response: [Array], execution_time_ms: 3 },
    '/top-countries': { response: [Object], execution_time_ms: 10 },
    '/team-insight': { response: [Array], execution_time_ms: 32 },
    '/active-users-per-day': { response: [Array], execution_time_ms: 58 }
  }
}
```

## Requisitos Técnicos

- Tempo de resposta < 1s por endpoint.
- Todos os endpoints precisam retornar o tempo de processamento (em milissegundos) e a timestamp da requisição
- Código limpo, modular, com funções bem definidas.
- Pode usar qualquer linguagem/framework.
- Documentação ou explicação final vale pontos bônus.
- Não pode usar IA.

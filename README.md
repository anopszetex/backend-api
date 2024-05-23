# API GraphQL

Esta API GraphQL facilita o gerenciamento de estudantes, fornecendo operações CRUD (criar, ler, atualizar e deletar). Com GraphQL, você tem mais flexibilidade e controle sobre os dados que solicita, tornando a integração com suas aplicações mais eficiente.

## Tecnologias Utilizadas 👨‍💻

- [Node.js >v20.0.0 <21.1.0](https://nodejs.org/en/download/)
- [Npm 10.2.4](https://docs.npmjs.com/cli/v8/commands/npm-install)
- [GraphQL 16.8.1](https://graphql.org/)
- [Fastify 4.26.1](https://www.fastify.io/docs/latest/Guides/Getting-Started/)
- [Mercurius 13.3.3](https://mercurius.dev/#/?id=install)
- [Postgres 14+](https://www.postgresql.org/)

### Requisitos 📋

Clone este repositório para o seu ambiente local:

```bash
git clone git@github.com:anopszetex/backend-api.git
```

Navegue até o diretório do projeto:

```bash
cd backend-api
```

Instale as dependências do projeto:

```bash
npm ci --silent
```

Para iniciar o servidor, execute o seguinte comando:

```bash
npm run dev
```

### Testes 🧪

Para executar os testes, execute os seguintes comandos:

```bash
# executa teste unitário e de integração
npm run test

# para observar qualquer alteração nos testes
npm run test:watch

# para rodar apenas o teste unitário e/ou e2e, você pode passar o caminho do arquivo
npm run test caminho/para/arquivo.test.js
```

### Docker 🐳

Localmente o docker-compose é usado para criar uma instância do banco de dados.

```sh
# baixa as imagens docker
docker-compose pull

# sobe o serviço docker
docker-compose up

# sobe o serviço docker em segundo plano
docker-compose up -d

# encerra o serviço docker e os dados associados a eles
docker-compose down -v
```

### Migrations e Seeds 🌱

```sh
# executa as migrations
npm run knex:migrate
  ️
# executa as seeds
npm run knex:seed
```

### Lint e Prettier 🧹

```sh
# verifica se há erros no código
npm run lint:ci

# formata os arquivos
npm run format
```

### Scripts 📜

#### Add

```graphql
# mutation para criar um estudante
mutation CreateStudent($input: StudentInput!) {
  createStudent(input: $input) {
    id
    name
    email
    ra
    cpf
  }
}
```

```json
{
  "input": {
    "name": "John Doe",
    "email": "teste@teste.com",
    "ra": "123456",
    "cpf": "12345678901"
  }
}
```

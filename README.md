### Projeto X

Este é o README para o Projeto X, uma aplicação que utiliza Fastify, Knex e o plugin Mercurius para criar uma API GraphQL.

Requisitos
Certifique-se de ter o Node.js instalado na sua máquina. Você pode baixá-lo em nodejs.org.

Instalação
Clone este repositório para o seu ambiente local:
bash
Copy code
git clone https://github.com/seu-usuario/projeto-x.git
Navegue até o diretório do projeto:
bash
Copy code
cd projeto-x
Instale as dependências do projeto:
bash
Copy code
npm install
Configuração do Banco de Dados
Antes de iniciar o servidor, você precisa configurar o banco de dados. O Projeto X utiliza o Knex para gerenciar o banco de dados. Certifique-se de configurar o arquivo knexfile.js com as suas credenciais do banco de dados.

Iniciando o Servidor
Para iniciar o servidor, execute o seguinte comando:

bash
Copy code
npm start
Isso iniciará o servidor Fastify na porta padrão (ou na porta especificada, se você a tiver configurado).

Utilização da API GraphQL
Após iniciar o servidor, você pode acessar o Playground GraphQL em http://localhost:3000/graphql (se a porta padrão for utilizada).

Documentação
Para mais informações sobre como utilizar a API, consulte a documentação em docs/.

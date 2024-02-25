Nesse projeto utilizei Express.js como base, as requisições são administradas pelo diretório 'routes',
'controllers' é responsável pela aplicação das regras, assim como as operações do banco de dados,
que por sua vez são baseadas nas 'models', responsáveis por representar a estrutura das tabelas do banco.

Bibliotecas utilizadas:
Express
Sequelize
Nodemon
bcrypt
jsonwebtoken
swagger
cors
dotenv
mysql2

Caso tivesse mais tempo, adicionaria:

- typescript
- paginação nas consultas
- validações de DTO
- testes unitários


Disponibilizei o arquivo "docker-compose.yml" com mysql e phpmyadmin para que o projeto tenha um banco de dados ao rodar.

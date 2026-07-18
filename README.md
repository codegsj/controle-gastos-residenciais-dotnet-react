# Controle de Gastos Residenciais

Sistema de controle de gastos residenciais desenvolvido para processo seletivo.

A aplicação permite o gerenciamento de pessoas, cadastro de transações financeiras e geração de relatórios de receitas, despesas e saldo líquido.

---

## Tecnologias

### Backend

- C#
- .NET 8
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- Serilog
- Swagger
- Postman

### Frontend

- React
- TypeScript

---

## Arquitetura

O projeto utiliza uma arquitetura baseada em API REST.

O frontend desenvolvido em React consome os endpoints disponibilizados pelo backend desenvolvido em .NET 8.

A aplicação possui separação de responsabilidades entre as camadas:

- **Controllers:**  
Responsáveis por receber as requisições HTTP e retornar as respostas.

- **Services:**  
Responsáveis pelas regras de negócio da aplicação.

- **DTOs:**  
Responsáveis pela transferência de dados entre as camadas.

- **Models:**  
Representam as entidades do banco de dados.

- **Data:**  
Responsável pelo contexto do banco utilizando Entity Framework Core.

- **Middleware:**  
Responsável pelo tratamento global de exceções.

---

## Estrutura do Backend

```
ControleGastos.API
├── Controllers
├── Services
├── DTOs
├── Models
├── Data
├── Exceptions
├── Middleware
├── Migrations
└── Program.cs
```

---

## Banco de Dados

O projeto utiliza Entity Framework Core com migrations para versionamento da estrutura do banco de dados.

Banco utilizado:

- SQL Server

Principais entidades:

### Pessoa

Responsável pelo cadastro dos usuários.

Campos principais:

- Id
- Nome
- Idade

### Transação

Responsável pelo registro das movimentações financeiras.

Campos principais:

- Id
- Descrição
- Valor
- Tipo
- Data
- PessoaId

Relacionamento:

Uma pessoa pode possuir várias transações.

---

## Configuração do Banco de Dados

A conexão com o banco deve ser configurada no arquivo:

```
appsettings.json
```

Exemplo:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=ControleGastosDB;Trusted_Connection=True;TrustServerCertificate=True"
}
```

---

## Executando as Migrations

Para criar ou atualizar o banco de dados:

```bash
dotnet ef database update
```

Para criar uma nova migration:

```bash
dotnet ef migrations add NomeDaMigration
```

---

## Tratamento de Exceções

A aplicação possui um middleware global para tratamento de exceções.

O `ExceptionMiddleware` centraliza o tratamento de erros, evitando duplicação de código nos Controllers.

Tratamentos implementados:

- **400 Bad Request**  
Erros relacionados às regras de negócio.

- **404 Not Found**  
Recursos não encontrados.

- **500 Internal Server Error**  
Erros inesperados da aplicação.

---

## Logs da Aplicação

A aplicação utiliza o Serilog para geração de logs.

Os arquivos são armazenados na pasta:

```
Logs/
```

Os logs são separados diariamente.

Informações registradas:

- Inicialização da aplicação;
- Cadastro e exclusão de pessoas;
- Cadastro de transações;
- Validações de regras de negócio;
- Consultas;
- Geração de relatórios;
- Exceções capturadas pelo middleware.

---

## Endpoints Principais

### Pessoas

- Criar pessoa
- Listar pessoas
- Excluir pessoa

### Transações

- Criar transação
- Listar transações
- Buscar transações por pessoa

### Relatórios

- Consultar totais gerais
- Consultar totais por pessoa

A documentação completa dos endpoints está disponível através do Swagger.

---

## Melhorias Futuras

- Separação dos logs por categoria:
  - Requisições HTTP;
  - Banco de dados;
  - Erros.

- Implementação de autenticação utilizando JWT.

- Criação de testes automatizados.

- Deploy em ambiente cloud utilizando AWS ou Azure.

- Paginação nas consultas.

- Integração completa do frontend React com a API.
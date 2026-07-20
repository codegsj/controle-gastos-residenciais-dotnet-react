# Controle de Gastos Residenciais

Sistema de controle de gastos residenciais desenvolvido para processo seletivo.

A aplicação permite o gerenciamento de pessoas, cadastro de transações financeiras e geração de relatórios de receitas, despesas e saldo líquido.

O objetivo do projeto foi desenvolver uma aplicação completa utilizando uma API REST em .NET 8 integrada a um frontend React com TypeScript, aplicando boas práticas de arquitetura, organização de código e separação de responsabilidades.

---

# Funcionalidades

A aplicação permite:

- Cadastro, consulta e exclusão de pessoas;
- Cadastro de receitas e despesas;
- Associação de transações financeiras a pessoas;
- Consulta de transações gerais;
- Consulta de transações por pessoa;
- Dashboard com indicadores financeiros;
- Relatórios financeiros gerais;
- Relatórios individuais por pessoa;
- Cálculo automático de receitas, despesas e saldo líquido.

---

# Tecnologias

## Backend

- C#
- .NET 8
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- Serilog
- Swagger
- Postman

## Frontend

- React
- TypeScript
- Vite
- Axios
- React Router

---

# Arquitetura

O projeto utiliza uma arquitetura baseada em API REST.

O frontend desenvolvido em React consome os endpoints disponibilizados pelo backend desenvolvido em .NET 8.

A aplicação possui separação de responsabilidades entre as camadas:

## Backend

### Controllers

Responsáveis por receber as requisições HTTP e retornar as respostas da API.

### Services

Responsáveis pelas regras de negócio da aplicação.

### DTOs

Responsáveis pela transferência de dados entre as camadas.

### Models

Representam as entidades da aplicação.

### Data

Responsável pelo contexto do banco utilizando Entity Framework Core.

### Middleware

Responsável pelo tratamento global de exceções.

---

# Estrutura do Backend

```
ControleGastos.API

├── Controllers
├── Services
├── DTOs
├── Models
├── Data
├── Logs
├── Exceptions
├── Middleware
├── Migrations
└── Program.cs
```

---

# Estrutura do Frontend

```
src

├── components
├── pages
├── layouts
├── models
├── services
├── routes
└── styles
```

Responsabilidades:

### Components

Componentes reutilizáveis da interface.

### Pages

Representam as principais telas da aplicação.

### Services

Responsáveis pela comunicação com a API REST.

### Models

Tipagem das entidades utilizando TypeScript.

### Routes

Gerenciamento das rotas da aplicação.

### Layouts

Estruturas compartilhadas entre páginas.

---

# Banco de Dados

O projeto utiliza Entity Framework Core com migrations para versionamento da estrutura do banco.

Banco utilizado:

- SQL Server

---

# Principais Entidades

## Pessoa

Responsável pelo cadastro dos usuários.

Campos principais:

- Id
- Nome
- Idade


## Transação

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

# Configuração do Banco de Dados

A conexão deve ser configurada no arquivo:

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

# Executando o Backend

Acesse a pasta da API:

```bash
cd ControleGastos.API
```

Restaurar dependências:

```bash
dotnet restore
```

Executar migrations:

```bash
dotnet ef database update
```

Executar aplicação:

```bash
dotnet run
```

A API ficará disponível através do Swagger.

---

# Executando o Frontend

Acesse a pasta do frontend:

```bash
cd ControleGastos.Web
```

Instale as dependências:

```bash
npm install
```

Execute a aplicação:

```bash
npm run dev
```

Aplicação disponível em:

```
http://localhost:5173
```

---

# Migrations

Criar uma nova migration:

```bash
dotnet ef migrations add NomeDaMigration
```

Atualizar banco:

```bash
dotnet ef database update
```

---

# Tratamento de Exceções

A aplicação possui um middleware global para tratamento de exceções.

O `ExceptionMiddleware` centraliza o tratamento dos erros, evitando duplicação de código nos Controllers.

Tratamentos implementados:

## 400 Bad Request

Erros relacionados às regras de negócio.

## 404 Not Found

Recursos não encontrados.

## 500 Internal Server Error

Erros inesperados da aplicação.

---

# Logs da Aplicação

A aplicação utiliza Serilog para geração de logs.

Os arquivos são armazenados:

```
Logs/
```

Os registros incluem:

- Inicialização da aplicação;
- Cadastro e exclusão de pessoas;
- Cadastro de transações;
- Validações;
- Consultas;
- Geração de relatórios;
- Exceções capturadas.

---

# Endpoints Principais

## Pessoas

- Criar pessoa
- Listar pessoas
- Excluir pessoa


## Transações

- Criar transação
- Listar transações
- Buscar transações por pessoa


## Relatórios

- Consultar totais gerais
- Consultar totais por pessoa


A documentação completa está disponível através do Swagger.

---

# Decisões Técnicas

Algumas decisões adotadas no projeto:

- Utilização de DTOs para evitar exposição direta das entidades;
- Entity Framework Core para abstração do acesso ao banco;
- Services para centralização das regras de negócio;
- Middleware global para padronização dos erros;
- React com TypeScript para maior segurança no desenvolvimento;
- Componentização da interface visando reutilização e manutenção;
- Separação entre páginas, componentes e serviços no frontend.

---

# Melhorias Futuras

Possíveis evoluções para a aplicação:

- Implementação de autenticação utilizando JWT;
- Controle de permissões de usuários;
- Criação de testes automatizados;
- Deploy em ambiente cloud utilizando AWS ou Azure;
- Containerização utilizando Docker;
- Paginação nas consultas;
- Filtros avançados por período e usuário;
- Exportação de relatórios em PDF ou Excel;
- Dashboard com gráficos financeiros;
- Gráfico de gastos por período;
- Análise de despesas dos últimos 7 dias;
- Comparativo entre receitas e despesas;
- Indicadores de evolução financeira mensal.

---

# Autor

Desenvolvido por Gustavo Jesus.

Projeto desenvolvido como parte de processo seletivo para vaga de desenvolvimento.
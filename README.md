# Floripa TravelTech API 🚀
![Node.js](https://img.shields.io/badge/node.js-v18+-green)
![Express](https://img.shields.io/badge/express-4.x-blue)
![PostgreSQL](https://img.shields.io/badge/postgresql-15-blue)
![Swagger](https://img.shields.io/badge/swagger-documented-brightgreen)
![Status](https://img.shields.io/badge/status-active-success)

API REST desenvolvida para o gerenciamento de empreendimentos e startups do ecossistema de inovação de Santa Catarina, com foco no setor de turismo (TravelTech) de Florianópolis.

A aplicação permite o cadastro, consulta, atualização e remoção de registros de empreendimentos, centralizando informações importantes como dados do responsável, município, segmento de atuação, status e meios de contato.

Além das operações básicas de CRUD, a API disponibiliza recursos de busca, filtros, paginação e estatísticas, permitindo uma visão mais estruturada do ecossistema empreendedor. Dessa forma, a solução possibilita organizar, mapear e analisar dados de startups e empreendimentos da região, contribuindo para a compreensão do cenário de inovação e do desenvolvimento econômico local.

O projeto foi desenvolvido como parte do desafio técnico da trilha **IA para DEVs**, do programa **SCTEC**, organizado pelo **SENAI/SC LAB365**.

## 📌 Sobre o Desafio

Este projeto foi desenvolvido como parte do **desafio prático da trilha IA para DEVs**, do programa **SCTEC**, realizado pelo **SENAI/SC LAB365**.

O objetivo do desafio é avaliar as competências técnicas no desenvolvimento de software, por meio da construção de uma aplicação capaz de gerenciar informações relacionadas a empreendimentos em Santa Catarina.

A solução apresentada consiste em uma **API REST** que permite realizar operações de **CRUD (Create, Read, Update e Delete)** sobre registros de empreendimentos, contemplando dados como:

- Nome do empreendimento
- Nome do(a) empreendedor(a) responsável
- Município de Santa Catarina
- Segmento de atuação
- Meio de contato
- Status do empreendimento

Este repositório contém o código-fonte da aplicação e a documentação necessária para sua execução.

## 🎯 Objetivo do Projeto

O objetivo desta API é criar uma base estruturada de dados sobre startups de turismo em Florianópolis, permitindo:

- Cadastro e gestão de startups
- Mapeamento do ecossistema TravelTech
- Análise de crescimento e estágios das startups
- Consulta com filtros e busca inteligente
- Geração de estatísticas do setor

Esse projeto pode ser utilizado por:

- Incubadoras
- Aceleradoras
- Órgãos públicos
- Comunidades de inovação
- Pesquisadores do ecossistema de startups
- Desenvolvedores
- Investidores

## 🛠️ Tecnologias Utilizadas

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express](https://expressjs.com/)
- **ORM:** [Sequelize](https://sequelize.org/)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
- **Documentação:** [Swagger](https://swagger.io/)
- **Validação:** [Zod](https://zod.dev/)

## 🏗️ Arquitetura da Aplicação

A aplicação segue uma arquitetura em camadas, separando responsabilidades para facilitar a manutenção e escalabilidade.

- **Config** → Configurações do banco de dados e variáveis de ambiente.
- **Controllers** → Recebem as requisições HTTP e retornam as respostas.
- **Database** → Configuração da conexão e migrations do banco de dados.
- **Docs** → Documentação da API utilizando Swagger.
- **Middlewares** → Middlewares da aplicação.
- **Models** → Definem a estrutura das entidades utilizando Sequelize.
- **Routers** → Definem os endpoints da API.
- **Services** → Contêm as regras de negócio da aplicação.
- **Validations** → Validação dos dados utilizando Zod.

## 📋 Pré-requisitos

- Node.js instalado
- PostgreSQL instalado e em execução

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env` baseado no `.env_exemple`.

Exemplo:

```env
APP_PORT=3333
ALLOWED_ORIGINS=http://localhost:3333

DB_DIALECT=postgres
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=postgres
DB_DATABASE=floripatraveltech
DB_PORT=5432
DB_SCHEMA=public
```

## 🚀 Instalação e Configuração

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   ```

2. **Entrar no diretório:**
   ```bash
   cd floripa-traveltech-api
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Configure o banco de dados:**
   O projeto utiliza o Sequelize para gerenciar o banco. Utilize os comandos abaixo para preparar o ambiente:
   ```bash
   # Criar o banco de dados (se não existir)
   npm run db:create

   # Rodar as migrações (criar tabelas)
   npm run db:migrate

   # Se quiser rodar a criação do banco, as migrações e iniciar o servidor de uma vez (ignorar etapa 5)
   npm run prod
   ```

5. **Inicie o servidor:**
   ```bash
   # Modo Desenvolvimento (com Nodemon)
   npm run start:dev

   # Modo Produção (Node puro)
   npm run start:prod
   ```
   Servidor rodando em http://localhost:${APP_PORT}

## 📖 Documentação da API

A documentação interativa (Swagger) pode ser acessada em:
`http://localhost:${APP_PORT}/api-docs`

## 📡 Endpoints Principais

### Startups

**Schema:**
```json
{
  "id": "UUID",
  "nome": "String",
  "descricao": "Text",
  "cnpj": "String",
  "fundador": "String",
  "email": "String",
  "municipio": "String (Florianópolis)",
  "segmento_turismo": "Enum (Hospedagem, Transporte, Experiencias, Marketplace, Tecnologia_Hotelaria, Tecnologia_Agencias, Eventos, Turismo_Sustentavel, Outro)",
  "modelo_negocio": "String",
  "estagio": "Enum (Ideação, MVP, Tração, Escala)",
  "ano_fundacao": "Integer",
  "status": "Enum (Ativo, Inativo)"
}
```

#### 🟢 Criar Startup (`POST /api/startup`)
Cria um novo registro de startup no sistema.


**Exemplo de Corpo (JSON):**
```json
{
  "nome": "Floripa Guide",
  "descricao": "Plataforma de experiências locais.",
  "cnpj": "12345678000199",
  "fundador": "Maria Silva",
  "email": "contato@floripaguide.com",
  "municipio": "Florianópolis",
  "segmento_turismo": "Experiencias",
  "modelo_negocio": "B2C",
  "estagio": "MVP",
  "ano_fundacao": 2023,
  "status": "Ativo"
}
```
***Exemplo de resposta (JSON):***
```json
{
  "message": "Startup cadastrada com sucesso",
  "data": {
    "id": "e78239ab-b820-443e-8516-da59a3a50652",
    "nome": "Floripa Guide",
    "descricao": "Plataforma de experiências locais.",
    "cnpj": "12345678000199",
    "fundador": "Maria Silva",
    "email": "contato@floripaguide.com",
    "municipio": "Florianópolis",
    "segmento_turismo": "Experiencias",
    "modelo_negocio": "B2C",
    "estagio": "MVP",
    "ano_fundacao": 2023,
    "status": "Ativo",
    "created_at": "2026-03-05T17:45:40.000Z",
    "updated_at": "2026-03-05T17:45:40.000Z"
  }
}
```

#### 🔵 Listar Todas as Startups (`GET /api/startup`)
Retorna todas as startups cadastradas.
***Exemplo de resposta (JSON):***
```json
[
    {
      "id": "e78239ab-b820-443e-8516-da59a3a50652",
      "nome": "Floripa Guide",
      "descricao": "Plataforma de experiências locais.",
      "cnpj": "12345678000199",
      "fundador": "Maria Silva",
      "email": "contato@floripaguide.com",
      "municipio": "Florianópolis",
      "segmento_turismo": "Experiencias",
      "modelo_negocio": "B2C",
      "estagio": "MVP",
      "ano_fundacao": 2023,
      "status": "Ativo"
    }
]
```

#### 🔵 Buscar uma Startup por ID (`GET /api/startup/:id`)
Retorna os detalhes de uma startup específica.
***Exemplo de resposta (JSON):***
```json
{
  "id": "e78239ab-b820-443e-8516-da59a3a50652",
  "nome": "Floripa Guide",
  "descricao": "Plataforma de experiências locais.",
  "cnpj": "12345678000199",
  "fundador": "Maria Silva",
  "email": "contato@floripaguide.com",
  "municipio": "Florianópolis",
  "segmento_turismo": "Experiencias",
  "modelo_negocio": "B2C",
  "estagio": "MVP",
  "ano_fundacao": 2023,
  "status": "Ativo"
}
```

#### 🟡 Atualizar uma Startup (`PUT /api/startup/:id`)
Atualiza campos de uma startup existente.
**Exemplo de Corpo (JSON):**
```json
{
  "nome": "Floripa Guide Pro",
  "estagio": "Tração"
}
```
***Exemplo de resposta (JSON):***
```json
{
  "message": "Startup atualizada com sucesso",
  "data": {
    "nome": "Floripa Guide Pro",
    "estagio": "Tração"
  }
}
```

#### 🔴 Deletar uma Startup (`DELETE /api/startup/:id`)
Remove uma startup do banco de dados.
***Exemplo de resposta (JSON):***
```json
{
  "message": "Startup deletada com sucesso"
}
```

#### 🔵 Estatísticas (`GET /api/startup/stats`)
Retorna contagens e métricas gerais do ecossistema.
***Exemplo de resposta (JSON):***
```json
{
  "total_startups": 1,
  "por_estagio": [
    {
      "estagio": "MVP",
      "total": "1"
    }
  ],
  "por_status": [
    {
      "status": "Ativo",
      "total": "1"
    }
  ],
  "por_segmento": [
    {
      "segmento_turismo": "Experiencias",
      "total": "1"
    }
  ]
}
```

#### 🔍 Busca de Startups por Filtros (`GET /api/startup?...`)
Você pode combinar filtros para refinar sua busca:

- **Por Estágio:** `/api/startup?estagio=Ideação`
Filtros de estagios disponíveis: `Ideação`, `MVP`, `Tração`, `Escala`
- **Por Status:** `/api/startup?status=Ativo`
Filtros de status disponíveis: `Ativo`, `Inativo`
- **Por Segmento:** `/api/startup?segmento_turismo=Hospedagem`
Filtros de segmentos disponíveis: `Hospedagem`, `Transporte`, `Experiencias`, `Marketplace`, `Tecnologia_Hotelaria`, `Tecnologia_Agencias`, `Eventos`, `Turismo_Sustentavel`, `Outro`
- **Por Modelo de Negócio:** `/api/startup?modelo_negocio=B2B`
- **Por Ano de Fundação:** `/api/startup?ano_fundacao=2024`

#### 📄 Paginação de Startups (`GET /api/startup?page=1&limit=10`)
Controle a quantidade de resultados por página:
- `page`: Número da página (Padrão: 1)
- `limit`: Quantidade de itens por página (Padrão: 10)

#### 🔵 Busca de Startups por Nome (`GET /api/startup/search?nome=...`)
Busca aproximada pelo nome da startup.
- **Exemplo:** `/api/startup/search?nome=Floripa`

## ⚠️ Possíveis Erros

A API pode retornar alguns códigos de erro:

| Código | Descrição |
|------|------|
| 400 | Dados inválidos na requisição |
| 404 | Startup não encontrada |
| 409 | CNPJ já cadastrado |
| 500 | Erro interno do servidor |

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte do desafio técnico da trilha **IA para DEVs** do programa **SCTEC – SENAI/SC LAB365**.
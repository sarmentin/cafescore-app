# ☕ Caféscore App

Frontend da aplicação Caféscore — plataforma para avaliação do café servido em clínicas médicas.

## 🛠️ Tecnologias

- Angular 18
- Angular Material (tema Azure/Blue)
- TypeScript
- SCSS
- RxJS

## 📱 Design

- Mobile-first
- Responsivo para celular, tablet e desktop
- Lazy loading em todas as rotas

## ⚙️ Pré-requisitos

- Node.js 20+ (https://nodejs.org)
- Angular CLI (https://angular.dev/cli)

Para instalar o Angular CLI:
npm install -g @angular/cli

## 🚀 Como rodar localmente

### 1. Clone o repositório

git clone https://github.com/sarmentin/cafescore-app.git
cd cafescore-app

### 2. Instale as dependências

npm install

### 3. Configure o ambiente

Edite o arquivo src/environments/environment.development.ts:

export const environment = {
  production: false,
  apiUrl: 'https://localhost:7183/api'
};

### 4. Rode a aplicação

ng serve

A aplicação estará disponível em http://localhost:4200.

A API backend precisa estar rodando. Veja: https://github.com/sarmentin/cafescore-api

## 🗂️ Estrutura do Projeto

src/app/
├── core/
│   ├── guards/        → proteção de rotas (auth)
│   ├── interceptors/  → interceptor JWT
│   └── services/      → auth, clínica, avaliação
├── features/
│   ├── auth/          → login e registro
│   ├── clinicas/      → lista e detalhe de clínicas
│   └── avaliacoes/    → criar e gerenciar avaliações
├── models/            → interfaces TypeScript
└── shared/            → componentes reutilizáveis

## 📋 Telas

- Lista de Clínicas — cards com nota média e total de avaliações
- Detalhe da Clínica — informações + lista de avaliações
- Login / Registro — autenticação com email e senha
- Avaliar Café — seleção de estrelas (1-5) + comentário
- Minhas Avaliações — gerenciar suas avaliações

## 🏗️ Build para produção

ng build

## 🔗 Repositório do Backend

https://github.com/sarmentin/cafescore-api
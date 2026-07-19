# Testes Automatizados de Cadastro - Frenet

## 🎯 Objetivo
Este projeto tem como objetivo automatizar o fluxo de cadastro de usuários na aplicação [Frenet](https://frenet.com.br), garantindo que os campos sejam corretamente validados e que as mensagens de erro sejam exibidas conforme esperado.

---

## ⚠️ Limitação do reCAPTCHA
O fluxo positivo de cadastro está implementado no código, mas **não pode ser concluído em produção** devido ao reCAPTCHA ativo, que impede a automação do clique no botão de cadastro.  
Apesar disso, o código possui o fluxo completo para realizar o cadastro, o que funcionaria em um ambiente de QA ou em produção sem o reCAPTCHA habilitado.

---

## ✅ Testes Implementados
A suite cobre os seguintes cenários:

- Cadastro de novo usuário (bloqueado pelo reCAPTCHA).
- Não deve cadastrar sem nome.
- Não deve cadastrar com e-mail inválido.
- Não deve cadastrar com telefone inválido.
- Não deve cadastrar com confirmação de senha diferente.
- Não deve cadastrar com e-mail vazio.
- Não deve cadastrar com celular vazio.
- Não deve cadastrar com senha vazia.

Cada cenário negativo valida a mensagem de erro exibida pela aplicação, como:
- "Digite seu nome completo."
- "Digite um e-mail válido."
- "Informe um número de celular válido."
- "Senhas não conferem."
- "Campo obrigatório."

---

## 📌 Boas Práticas Adotadas
Durante o desenvolvimento dos testes, foram aplicadas diversas boas práticas para viabilizar e organizar o projeto:

- **Uso do `cy.origin`**: necessário para interagir com o domínio externo do cadastro.
- **Uso do Faker**: geração dinâmica de dados realistas para os testes.
- **Uso do `beforeEach`**: centralização do setup inicial (`cy.start()` e `cy.goToSignup()`).
- **Criação de helper `generateUserData()`**: função utilitária para gerar dados de usuário.
- **Ajuste no comando `visit`**: uso de `failOnStatusCode: false` e tratamento de exceções para evitar falhas desnecessárias.
- **Estrutura de dados em `utils.js`**: organização das funções auxiliares.
- **Uso de comandos customizados**: importados de `commands.js` para manter o código limpo e reutilizável.
- **Validações robustas**: uso de seletores diretos como `#Password_msg.invalid-feedback` para eliminar oscilações em mensagens de erro.

---

## 🛠️ Tecnologias Utilizadas
- [Cypress](https://www.cypress.io/) — framework de testes end-to-end.
- [Faker.js](https://fakerjs.dev/) — geração de dados dinâmicos.
- Node.js — ambiente de execução.
- NPM — gerenciamento de dependências.

---

## 📂 Estrutura de Pastas
Os testes estão organizados na pasta `cypress/e2e`. O arquivo `cadastro.cy.js` está cobrindo os cenários do fluxo de cadastro de usuário.

---

## ▶️ Como Executar o Projeto

A seguir está o passo a passo completo para preparar o ambiente e executar os testes de cadastro:

### 1. Pré-requisitos
Antes de começar, certifique-se de ter instalado:
- **Node.js** (versão LTS recomendada) → https://nodejs.org/
- **NPM** (instalado junto com o Node.js)
- **Git** → https://git-scm.com/

### 2. Clonar o repositório
No terminal, execute:

git clone https://github.com/icaromarinho/frenet.git

### 3. Acessar a pasta do projeto
`cd frenet`

### 4. Instalar o Cypress e dependências
Instale todas as dependências listadas no **package.json**:

`npm install`

### 5. Abrir o Cypress em modo interativo
`npx cypress open`

- A interface gráfica do Cypress será aberta.
- Selecione o arquivo **`cadastro.cy.js`** dentro da pasta **`cypress/e2e/`** para rodar os testes.

### 6. Executar os testes em modo headless (opcional)
Se preferir rodar sem interface:

`npx cypress run`

- O Cypress executará todos os testes e exibirá os resultados diretamente no terminal.
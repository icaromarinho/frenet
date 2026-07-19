import { generateUserData } from '../support/utils'

/// <reference types="cypress" />

describe('Cadastro', () => {

    beforeEach(() => {
        cy.start()
        cy.goToSignup()
    })

    it('Deve cadastrar um novo usuário (impedido por reCaptcha)', () => {

        const user = generateUserData()

        cy.origin('https://cadastro.frenet.com.br', { args: { user } }, ({ user }) => {
            cy.get('input[name="Name"]').type(user.name)
            cy.get('input[name="Email"]').type(user.email)
            cy.get('input[name="Cellphone"]').type(user.phone)
            cy.get('input[name="Password"]').type(user.password)
            cy.get('input[name="ConfirmPassword"]').type(user.password)

            // Fluxo abaixo só funcionaria em ambiente de QA ou sem reCaptcha

            // cy.get('#btnSubmit').click()
            // cy.contains('Cadastro realizado com sucesso').should('be.visible')
        })
    })

    it('Não deve cadastrar sem nome', () => {

        const user = generateUserData()

        cy.origin('https://cadastro.frenet.com.br', { args: { user } }, ({ user }) => {
            // Não preencher o campo de nome
            cy.get('input[name="Email"]').type(user.email)
            cy.get('input[name="Cellphone"]').type(user.phone)
            cy.get('input[name="Password"]').type(user.password)
            cy.get('input[name="ConfirmPassword"]').type(user.password)
            cy.contains('Digite seu nome completo.').should('be.visible')
        })
    })

    it('Não deve cadastrar com e-mail inválido', () => {

        const user = generateUserData()
        const invalidEmail = 'usuario.com'

        cy.origin('https://cadastro.frenet.com.br', { args: { user, invalidEmail } }, ({ user, invalidEmail }) => {
            cy.get('input[name="Name"]').type(user.name)
            cy.get('input[name="Email"]').type(invalidEmail) // Aqui está o erro
            cy.get('input[name="Cellphone"]').type(user.phone)
            cy.get('input[name="Password"]').type(user.password)
            cy.get('input[name="ConfirmPassword"]').type(user.password)
            cy.contains('Digite um e-mail válido').should('be.visible')
        })
    })

    it('Não deve cadastrar com telefone inválido', () => {

        const user = generateUserData()
        const invalidPhone = '12345'

        cy.origin('https://cadastro.frenet.com.br', { args: { user, invalidPhone } }, ({ user, invalidPhone }) => {
            cy.get('input[name="Name"]').type(user.name)
            cy.get('input[name="Email"]').type(user.email)
            cy.get('input[name="Cellphone"]').type(invalidPhone) // Aqui está o erro
            cy.get('input[name="Password"]').type(user.password)
            cy.get('input[name="ConfirmPassword"]').type(user.password)
            cy.contains('Informe um número de celular válido.').should('be.visible')
        })
    })

    it('Não deve cadastrar com confirmação de senha diferente', () => {

        const user = generateUserData()
        const wrongConfirmPassword = 'senha_diferente'

        cy.origin('https://cadastro.frenet.com.br', { args: { user, wrongConfirmPassword } }, ({ user, wrongConfirmPassword }) => {
            cy.get('input[name="Name"]').type(user.name)
            cy.get('input[name="Email"]').type(user.email)
            cy.get('input[name="Cellphone"]').type(user.phone)
            cy.get('input[name="Password"]').type(user.password)
            cy.get('input[name="ConfirmPassword"]').type(wrongConfirmPassword) // Aqui está o erro
            cy.contains('Senhas não conferem').should('be.visible')
        })
    })

    it('Não deve cadastrar com e-mail vazio', () => {

        const user = generateUserData()

        cy.origin('https://cadastro.frenet.com.br', { args: { user } }, ({ user }) => {
            cy.get('input[name="Name"]').type(user.name)
            // Não preencher o campo de e-mail
            cy.get('input[name="Cellphone"]').type(user.phone)
            cy.get('input[name="Password"]').type(user.password)
            cy.get('input[name="ConfirmPassword"]').type(user.password)
            cy.contains('Campo obrigatório.').should('be.visible')
        })
    })

    it('Não deve cadastrar com celular vazio', () => {

        const user = generateUserData()

        cy.origin('https://cadastro.frenet.com.br', { args: { user } }, ({ user }) => {
            cy.get('input[name="Name"]').type(user.name)
            cy.get('input[name="Email"]').type(user.email)
            // Não preencher o campo de celular
            cy.get('input[name="Password"]').type(user.password)
            cy.get('input[name="ConfirmPassword"]').type(user.password)
            cy.contains('Campo obrigatório.').should('be.visible')
        })
    })

    it('Não deve cadastrar com senha vazia', () => {

        const user = generateUserData()

        cy.origin('https://cadastro.frenet.com.br', { args: { user } }, ({ user }) => {
            cy.get('input[name="Name"]').type(user.name)
            cy.get('input[name="Email"]').type(user.email)
            cy.get('input[name="Cellphone"]').type(user.phone)         
            cy.get('input[name="ConfirmPassword"]').type(user.password)
            cy.get('#Password_msg.invalid-feedback').should('be.visible').and('contain', 'Campo obrigatório.')
        })
    })
})
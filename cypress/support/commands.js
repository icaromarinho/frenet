Cypress.Commands.add('start', () => {
    cy.viewport(1920, 1080)
    cy.visit('https://www.frenet.com.br', { failOnStatusCode: false })
})

Cypress.Commands.add('goToSignup', () => {
  cy.contains('Criar conta grátis').click()

  cy.origin('https://cadastro.frenet.com.br', () => {
    cy.contains('Você já faz de tudo pelo seu e-commerce. Por que não deixar o frete com a gente?')
      .should('be.visible')
  })
})


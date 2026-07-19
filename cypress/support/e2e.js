import './commands'

// Ignorar erros de scripts externos
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retorna false para impedir que o Cypress falhe
  return false
})

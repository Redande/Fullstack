// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

beforeEach(function () {
  cy.request('POST', 'http://localhost:3003/api/testing/reset')
  const user = {
    name: 'Test User',
    username: 'tester',
    password: 'secret'
  }
  cy.request('POST', 'http://localhost:3003/api/users/', user)
  cy.visit('http://localhost:3000')

  cy.get('#username')
    .type('tester')
  cy.get('#password')
    .type('secret')
  cy.contains('kirjaudu')
    .click()
})

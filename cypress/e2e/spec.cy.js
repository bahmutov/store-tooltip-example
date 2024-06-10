// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import 'cypress-real-events/support'

it('adds an item to the cart via tooltip', () => {
  cy.visit('/index.php?route=product/manufacturer/info&manufacturer_id=8')
})

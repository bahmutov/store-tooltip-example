/// <reference types="cypress" />

// this plugin implements the hover native command
// https://github.com/dmtrKovalenko/cypress-real-events
import 'cypress-real-events/support'

it('adds an item to the cart via tooltip', { scrollBehavior: 'center' }, () => {
  cy.visit('/index.php?route=product/manufacturer/info&manufacturer_id=8')
  cy.get('.product-thumb')
    .should('have.length.greaterThan', 3)
    .wait(1000)
    .first()
    .within(() => {
      cy.get('.product-action').should('not.be.visible')
      cy.get('.product-thumb-top').realHover()
      // spy on the POST call the app makes when adding to cart
      // and give it an alias "addToCart"
      // https://on.cypress.io/intercept
      // https://on.cypress.io/as

      cy.get('.product-action')
        .should('be.visible')
        .contains('button', 'Add to Cart')
        .click()
    })

  // wait for the POST call to complete
  // and grab its request body
  // it should contain the product ID and quantity
  // https://on.cypress.io/wait
})

/// <reference types="cypress" />

// this plugin implements the hover native command
// https://github.com/dmtrKovalenko/cypress-real-events
import 'cypress-real-events/support'

it('adds an item to the cart via tooltip', { scrollBehavior: 'center' }, () => {
  // "freeze" the application clock
  // https://on.cypress.io/clock
  cy.visit('/index.php?route=product/manufacturer/info&manufacturer_id=8')

  cy.get('.product-thumb')
    .should('have.length.greaterThan', 3)
    .first()
    .within(() => {
      cy.get('.product-action').should('not.be.visible')
      cy.get('.product-thumb-top').realHover()

      cy.get('.product-action')
        .should('be.visible')
        .contains('button', 'Add to Cart')
        .click()
    })

  // the notification popup with text "View Cart" appears
  cy.contains('#notification-box-top', 'View Cart').should('be.visible')
  // the notification popup hides after about 10-12 seconds
  // fast-forward application clock 15 seconds
  // https://on.cypress.io/tick
  //
  // confirm the notification popup is hidden _immediately_
  cy.get('#notification-box-top', { timeout: 15_000 }).should('be.hidden')
})

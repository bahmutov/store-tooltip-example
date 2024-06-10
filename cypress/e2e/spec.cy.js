/// <reference types="cypress" />

// this plugin implements the hover native command
// https://github.com/dmtrKovalenko/cypress-real-events
import 'cypress-real-events/support'

it('adds an item to the cart via tooltip', () => {
  // open the product page
  cy.visit('/index.php?route=product/manufacturer/info&manufacturer_id=8')
  // there should be several products on the page
  cy.get('.product-thumb')
    .should('have.length.greaterThan', 3)
    // let the page load and take the first product
    .wait(1000)
    .first()
    // within the ".product-thumb" element
    .within(() => {
      // the product action element should be invisible
      // when we hover over the ".product-thumb-top" element
      // the action element should become visible
      // Tip: you need the "realHover" command from cypress-real-events
      cy.get('.product-action').should('not.be.visible')
      cy.get('.product-thumb-top').realHover()
      cy.get('.product-action')
        .should('be.visible')
        // find the button "Add to Cart" and click it
        .contains('button', 'Add to Cart')
        .click()
    })

  // the notification popup with text "View Cart" appears
  cy.contains('#notification-box-top', 'View Cart').should('be.visible')
  // then the popup goes away after about 15 seconds
  cy.get('#notification-box-top', { timeout: 15_000 }).should('not.be.visible')
})

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
      // get the product id from the image A element
      cy.get('a[id^=mz-product-grid-image-]')
        .should('have.attr', 'id')
        .invoke('match', /mz-product-grid-image-(?<id>\d+)/)
        .its('groups.id')
        .should('be.a', 'string')
        .as('productId', { type: 'static' })

      // spy on the "window.cart.add" method
      // https://on.cypress.io/window
      // https://on.cypress.io/spy
      // give the spy an alias "add"

      cy.get('.product-action')
        .should('be.visible')
        .contains('button', 'Add to Cart')
        .click()
    })

  // get the value of the productId alias
  // and confirm the method "cart.add" was called with this product id
})

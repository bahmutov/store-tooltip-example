// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import 'cypress-real-events/support'

it('adds an item to the cart via tooltip', () => {
  // TODO: freeze CSS animations
  // TODO: use cy.clock to make the test faster

  cy.visit('/index.php?route=product/manufacturer/info&manufacturer_id=8')
  cy.get('.product-thumb')
    .should('have.length.greaterThan', 3)
    .wait(1000)
    .first()
    .within(() => {
      // get the product id
      cy.get('a[id^=mz-product-grid-image-]')
        .should('have.attr', 'id')
        // yields the "id" attribute
        // capture the "id" part of the string using regex capture group
        .invoke('match', /mz-product-grid-image-(?<id>\d+)/)
        .its('groups.id')
        .should('be.a', 'string')
        .then((productId) => {
          cy.get('.product-action').should('not.be.visible')
          cy.get('.product-thumb-top').realHover()

          cy.intercept('POST', '/index.php?route=checkout/cart/add').as(
            'addToCart',
          )
          cy.window()
            .its('cart')
            .then((cart) => {
              cy.spy(cart, 'add').as('add')
            })
          cy.get('.product-action')
            .should('be.visible')
            .contains('button', 'Add to Cart')
            .click()
          cy.wait('@addToCart')
            .its('request.body')
            .should('equal', `product_id=${productId}&quantity=1`)

          cy.get('@add').should('have.been.calledOnceWithExactly', productId)
        })
    })

  cy.contains('#notification-box-top', 'View Cart').should('be.visible')
  // then the popup goes away
  cy.get('#notification-box-top', { timeout: 15_000 }).should('not.be.visible')
})

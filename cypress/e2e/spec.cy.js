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
      cy.intercept('POST', '/index.php?route=checkout/cart/add').as('addToCart')

      // get the product id from the image A element
      // it is encoded in the "id" attribute like "mz-product-grid-image-1234"
      cy.get('a[id^=mz-product-grid-image-]')
        .should('have.attr', 'id')
        // yields the "id" attribute
        // capture the "id" part of the string using regex capture group
        .invoke('match', /mz-product-grid-image-(?<id>\d+)/)
        .its('groups.id')
        .should('be.a', 'string')
        // and save it as an alias "productId"
        // https://on.cypress.io/as
        .as('productId', { type: 'static' })

      cy.get('.product-action')
        .should('be.visible')
        .contains('button', 'Add to Cart')
        .click()
    })

  // get the value of the productId alias
  // and use it to confirm the _exact_ request body
  // sent to the server by the "addToCart" network call
  // https://on.cypress.io/get
  cy.get('@productId').then((productId) => {
    cy.wait('@addToCart')
      .its('request.body')
      .should('equal', `product_id=${productId}&quantity=1`)
  })
})

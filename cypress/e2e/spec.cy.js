/// <reference types="cypress" />

// this plugin implements the hover native command
// https://github.com/dmtrKovalenko/cypress-real-events
import 'cypress-real-events/support'

it('adds an item to the cart via tooltip', { scrollBehavior: 'center' }, () => {
  // open the product page
  cy.visit('/index.php?route=product/manufacturer/info&manufacturer_id=8')
  // there should be several products on the page
  // let the page load and take the first product
  // within the ".product-thumb" element
  //
  // the product action element should be invisible
  // when we hover over the ".product-thumb-top" element
  // the action element should become visible
  // Tip: you need the "realHover" command from cypress-real-events
  //
  // find the button "Add to Cart" and click it

  // the notification popup with text "View Cart" appears
  //
  // then the popup goes away after about 15 seconds
})

/// <reference types="cypress" />
import cy from "cypress"


context('Home', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5500/login')
    })
  
    it('Personal Budget and Expenses Web Application', ()=>{
      cy.get('h1').contains('You are not logged in')
    })
  
    it('should look the same', () => {
      cy.eyesOpen({
        appName: 'Personal Budget and Expenses Web Application',
        testName: 'Login check'
      });
      cy.eyesCheckWindow();
       cy.eyesClose();
     })
  })
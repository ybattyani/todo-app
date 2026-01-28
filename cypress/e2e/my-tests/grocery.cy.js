/// <reference types="cypress" />
import { itemSelectors } from "../../constants/selectors/item";
import { taskName } from "../../constants/variables/variable";

describe("Grocery Page Testing", () => {
  beforeEach(() => {
    cy.visit('todo-app/grocery')
    cy.get('h1').should('contain','Grocery List')
    cy.get(itemSelectors.delete_all).click()
    cy.get(itemSelectors.item_name).should('not.exist')
  });

  after(()=>{
    cy.get(itemSelectors.delete_all).click()
    cy.get(itemSelectors.item_name).should('not.exist')
  })

  it('Grocery create, check and delete', ()=>{
    const itemTitle = taskName+'Grocery Item'

    //create
    console.log(itemSelectors)
    cy.get(itemSelectors.add_item_input).type(itemTitle)
    cy.get(itemSelectors.add_item_button).click()
    cy.get(itemSelectors.item_name).should('contain', itemTitle)
    cy.get(itemSelectors.add_item_input).type(itemTitle+" 2")
    cy.get(itemSelectors.add_item_button).click()
    cy.get(itemSelectors.item_name).contains(itemTitle+ " 2").should('exist')
    cy.get(itemSelectors.item_name).eq(0).should('not.have.class','completed')
    cy.get(itemSelectors.item_name).eq(1).should('not.have.class','completed')
    //Click on 
    cy.get(itemSelectors.checkbox).eq(0).click()
    cy.get(itemSelectors.item_name).eq(0).should('not.have.class','completed')
    cy.get(itemSelectors.item_name).eq(1).should('have.class','completed')
    
    //check
    cy.get(itemSelectors.checkbox).eq(0).click()

    //verify Refresh All
    cy.get(itemSelectors.item_name).eq(0).should('have.class','completed')
    cy.get(itemSelectors.item_name).eq(1).should('have.class','completed')
    cy.get(itemSelectors.refresh_all).click()
    cy.get(itemSelectors.item_name).eq(0).should('not.have.class','completed')
    cy.get(itemSelectors.item_name).eq(1).should('not.have.class','completed')
    
  })
});

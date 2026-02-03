/// <reference types="cypress" />
import { navSelectors,routes } from '../../constants/selectors/navigation';

describe("Main navigation tiles", () => {
  beforeEach(() => {
    cy.visit('todo-app/')
  });

  routes.forEach(({ selector, path, title }) => {
    it(`navigates to ${path}`, () => {
      cy.get(`[data-cy="${selector}"]`).click();
      cy.url().should("include", path);
      cy.get("h1").should("contain", title);
    });
  });

  it('test Sidebar Menu', ()=>{
    cy.get(navSelectors.sidebarToggle).click()
    cy.get('h2').should('contain','My App')
    //count sidebar button
    cy.get(navSelectors.sidebarButton).should('have.length',6)
    //test Main button
    cy.get(navSelectors.sidebarButton).eq(0).click()
    cy.get("h1").should("contain", 'Main Page');
    routes.forEach((obj, index) => {
      //test SideBar buttons
      cy.get(navSelectors.sidebarToggle).click()
      cy.get('h2').should('contain','My App')
      cy.get(navSelectors.sidebarButton).eq(index+1).click()
      cy.get("h1").should("contain", obj.title);
    });
  })
});

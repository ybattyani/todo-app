/// <reference types="cypress" />

const routes = [
  { selector: "nav-tasks", path: "/todo-app/todoList", title: "To Do List"},
  { selector: "nav-morning", path: "/todo-app/morning-flow", title: "Morning Flow"},
  { selector: "nav-backlog", path: "/todo-app/backlog", title: "Backlog"},
  { selector: "nav-today", path: "/todo-app/today", title: "Today"},
];

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
    cy.get('.sidebar-toggle').click()
    cy.get('h2').should('contain','My App')
    //test Main button
    cy.get('.sidebar-link').eq(0).click()
    cy.get("h1").should("contain", 'Main Page');
    routes.forEach((obj, index) => {
      //test SideBar buttons
      cy.get('.sidebar-toggle').click()
      cy.get('h2').should('contain','My App')
      cy.get('.sidebar-link').eq(index+1).click()
      cy.get("h1").should("contain", obj.title);
    });
  })
});

/// <reference types="cypress" />
import { tasksSelectors, tasksCreationSelector } from "../../constants/selectors/task";

describe("Backlog Testing", () => {
  beforeEach(() => {
    cy.visit('todo-app/backlog')
  });

  it('Backlog create', ()=>{
    const text = 'Cypress Test Task Backlog'

    //create
    cy.get(tasksSelectors.add_task_button).click()
    cy.get(tasksCreationSelector.category).should('have.value','MYAPP')
    cy.get(tasksCreationSelector.title).type(text)
    cy.get(tasksCreationSelector.create_button).click()

    //verify creation
    cy.get(tasksSelectors.row).contains(text).should('exist')
    cy.contains(tasksSelectors.row, text).find(tasksSelectors.title).should('exist')
    cy.contains(tasksSelectors.row, text).find(tasksSelectors.date).should('exist')
    cy.contains(tasksSelectors.row, text).find(tasksSelectors.category).should('not.exist')

    //delete
    cy.contains(tasksSelectors.row, text).find(tasksSelectors.menu).click()
    cy.get(tasksSelectors.menu_delete).click()
    cy.get(tasksSelectors.row).contains(text).should('not.exist')
  })
});

/// <reference types="cypress" />
import { tasksSelectors, tasksCreationSelector } from "../../constants/selectors/task";

const prefix = Cypress.env("testTaskPrefix");

describe("Backlog Testing", () => {
  beforeEach(() => {
    cy.visit('todo-app/backlog')
    cy.get(tasksSelectors.row).should("have.length.greaterThan", 0);
  });

  after(()=>{
    cy.task("firebase:deleteTasksByTitleContains", prefix);
  })

  it('Backlog create', ()=>{
    const taskTitle = prefix+'Test Task Backlog'

    //create
    // cy.get(tasksSelectors.add_task_button).click()
    // cy.get(tasksCreationSelector.category).should('have.value','MYAPP')
    // cy.get(tasksCreationSelector.title).type(taskTitle)
    // cy.get(tasksCreationSelector.create_button).click()

    // //verify creation
    // cy.get(tasksSelectors.row).contains(taskTitle).should('exist')
    // cy.contains(tasksSelectors.row, taskTitle).find(tasksSelectors.title).should('exist')
    // cy.contains(tasksSelectors.row, taskTitle).find(tasksSelectors.date).should('exist')
    // cy.contains(tasksSelectors.row, taskTitle).find(tasksSelectors.category).should('not.exist')

    //delete
    // cy.contains(tasksSelectors.row, taskTitle).find(tasksSelectors.menu).click()
    // cy.get(tasksSelectors.menu_delete).click()
    // cy.get(tasksSelectors.row).contains(taskTitle).should('not.exist')
  })
});

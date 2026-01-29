/// <reference types="cypress" />
import { tasksSelectors, tasksCreationSelector } from "../../constants/selectors/task";
import { text } from "../../constants/variables/variable";

describe("TodayPage Testing", () => {
  beforeEach(() => {
    cy.visit('todo-app/today')
    // cy.get(tasksSelectors.row).should("have.length.greaterThan", 0);
  });

  it('Backlog create', ()=>{
    const taskTitle = text+'Test Task Todays'
    
  })
});

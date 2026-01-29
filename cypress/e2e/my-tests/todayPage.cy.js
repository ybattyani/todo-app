/// <reference types="cypress" />
import { todaySelector } from "../../constants/selectors/todayPage";
import { text } from "../../constants/variables/variable";

describe("TodayPage Testing", () => {
  beforeEach(() => {
    cy.visit('todo-app/today')
  });

  it('Backlog create', ()=>{
    // const taskTitle = text+'Test Task Today'
    cy.get('h1').should('contain', 'Today')
    cy.get(todaySelector.change_day).should('contain', 'Show Tomorrow').click()
    cy.get('h1').should('contain', 'Tomorrow')
    cy.get(todaySelector.change_day).should('contain', 'Show Today').click()
    cy.get('h1').should('contain', 'Today')
  })
});

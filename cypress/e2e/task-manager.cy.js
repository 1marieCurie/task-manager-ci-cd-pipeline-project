describe('Task Manager', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the application title', () => {

    cy.contains('h1', 'Mini Task Manager')
      .should('be.visible')

  })

  it('should allow the user to add a task', () => {

    cy.get('[data-cy="task-input"]')
        .type('Learn Cypress')

    cy.get('[data-cy="add-task"]')
        .click()

    cy.contains('[data-cy="task-title"]', 'Learn Cypress')
        .should('be.visible')

  })

  it('should allow the user to complete a task', () => {

    cy.get('[data-cy="task-input"]')
        .type('Practice GitHub Actions')

    cy.get('[data-cy="add-task"]')
        .click()

    cy.get('[data-cy="task-title"]')
        .click()

    cy.get('[data-cy="task-title"]')
        .should('have.class', 'completed')

  })

  it('should allow the user to delete a task', () => {

    cy.get('[data-cy="task-input"]')
        .type('Delete this task')

    cy.get('[data-cy="add-task"]')
        .click()

    cy.get('[data-cy="delete-task"]')
        .click()

    cy.get('[data-cy="task-item"]')
        .should('not.exist')

    cy.get('[data-cy="empty-message"]')
        .should('be.visible')

  })

})
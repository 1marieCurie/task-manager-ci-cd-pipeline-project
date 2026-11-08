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

  
it('should display all tasks by default', () => {
  cy.get('[data-cy="task-input"]').type('Task one')
  cy.get('[data-cy="add-task"]').click()

  cy.get('[data-cy="task-input"]').type('Task two')
  cy.get('[data-cy="add-task"]').click()

  cy.get('[data-cy="task-item"]')
    .should('have.length', 2)
})

it('should display only active tasks', () => {
  cy.get('[data-cy="task-input"]').type('Completed task')
  cy.get('[data-cy="add-task"]').click()

  cy.get('[data-cy="task-input"]').type('Active task')
  cy.get('[data-cy="add-task"]').click()

  // Complete the first task
  cy.contains('[data-cy="task-title"]', 'Completed task')
    .click()

  // Apply the Active filter
  cy.get('[data-cy="filter-active"]').click()

  cy.get('[data-cy="task-item"]')
    .should('have.length', 1)

  cy.contains('[data-cy="task-title"]', 'Active task')
    .should('be.visible')

  cy.contains('[data-cy="task-title"]', 'Completed task')
    .should('not.exist')
})

it('should display only completed tasks', () => {
  cy.get('[data-cy="task-input"]').type('Completed task')
  cy.get('[data-cy="add-task"]').click()

  cy.get('[data-cy="task-input"]').type('Active task')
  cy.get('[data-cy="add-task"]').click()

  // Complete the first task
  cy.contains('[data-cy="task-title"]', 'Completed task')
    .click()

  // Apply the Completed filter
  cy.get('[data-cy="filter-completed"]').click()

  cy.get('[data-cy="task-item"]')
    .should('have.length', 1)

  cy.contains('[data-cy="task-title"]', 'Completed task')
    .should('be.visible')

  cy.contains('[data-cy="task-title"]', 'Active task')
    .should('not.exist')
})



})
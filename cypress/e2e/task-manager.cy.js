
describe('Task Manager', () => {

  beforeEach(() => {
    cy.request({
        method: 'DELETE',
        url: `${Cypress.expose('apiUrl')}/api/test/reset`
    }).its('status').should('eq', 200)

    cy.visit('/')

    // Wait until the initial database retrieval finishes
    cy.get('[data-cy="loading-message"]')
        .should('not.exist')
    })

  it('should display the application title', () => {

    cy.contains('h1', 'My Tasks')
    .should('be.visible')

    cy.contains('.brand-name', 'TaskPilot')
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

    // Select only the task we want to complete
    cy.contains('[data-cy="task-title"]', 'Practice GitHub Actions')
      .click()
      .should('have.class', 'completed')

  })

  it('should allow the user to delete a task', () => {

    cy.get('[data-cy="task-input"]')
      .type('Delete this task')

    cy.get('[data-cy="add-task"]')
      .click()

    // Find the specific task and click its delete button
    cy.contains('[data-cy="task-item"]', 'Delete this task')
      .within(() => {
        cy.get('[data-cy="delete-task"]').click()
      })

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

    // Complete only the first task
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

    // Complete only the first task
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

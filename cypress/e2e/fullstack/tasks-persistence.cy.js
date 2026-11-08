
describe("Full-stack task persistence", () => {
  it("should create a task, preserve it after refresh, and delete it", () => {
    const taskTitle = `Full-stack test ${Date.now()}`;

    // 1. Open the React application
    cy.visit("/");

    // 2. Create a task through the UI
    cy.get('[data-cy="task-input"]')
      .type(taskTitle);

    cy.get('[data-cy="add-task"]')
      .click();

    // 3. Verify that the task appears
    cy.contains('[data-cy="task-item"]', taskTitle)
      .should("be.visible");

    // 4. Refresh the page
    cy.reload();

    // 5. Verify that the task was retrieved from MySQL
    cy.contains('[data-cy="task-item"]', taskTitle)
      .should("be.visible");

    // 6. Delete the task through the UI
    cy.contains('[data-cy="task-item"]', taskTitle)
      .within(() => {
        cy.get('[data-cy="delete-task"]').click();
      });

    // 7. Verify that the task disappeared
    cy.contains('[data-cy="task-item"]', taskTitle)
      .should("not.exist");
  });
});

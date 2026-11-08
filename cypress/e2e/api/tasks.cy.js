
describe("Tasks API - CRUD", () => {

  const apiUrl = Cypress.expose("apiUrl");
  let taskId;

  // Clean up tasks created by each test
  afterEach(() => {
    if (taskId) {
      cy.request({
        method: "DELETE",
        url: `${apiUrl}/api/tasks/${taskId}`,
        failOnStatusCode: false
      });

      taskId = null;
    }
  });

  // Helper to create a task
  const createTask = (title) => {
    return cy.request({
      method: "POST",
      url: `${apiUrl}/api/tasks`,
      body: { title }
    }).then((response) => {
      taskId = response.body.id;
      return response;
    });
  };

  // GET
  it("should retrieve all tasks", () => {
    cy.request("GET", `${apiUrl}/api/tasks`)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("array");
      });
  });

  // POST
  it("should create a new task", () => {
    createTask("Learn Cypress API testing")
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.title)
          .to.eq("Learn Cypress API testing");
        expect(response.body.id).to.be.a("number");
      });
  });

  // PATCH
  it("should update task completion status", () => {
    createTask("Test task")
      .then((response) => {
        const id = response.body.id;

        return cy.request({
          method: "PATCH",
          url: `${apiUrl}/api/tasks/${id}`,
          body: { completed: true }
        });
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(Number(response.body.completed)).to.eq(1);
      });
  });

  // DELETE
  it("should delete a task", () => {
    createTask("Task to delete")
      .then((response) => {
        const id = response.body.id;

        return cy.request({
          method: "DELETE",
          url: `${apiUrl}/api/tasks/${id}`
        });
      })
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });

  // Validation
  it("should reject an empty task title", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/api/tasks`,
      body: { title: "   " },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message)
        .to.eq("Task title is required");
    });
  });

});

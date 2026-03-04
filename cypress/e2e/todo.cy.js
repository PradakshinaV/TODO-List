describe('Todo App - Full End to End Test', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  // TEST 1: Add a task
  it('adds a new task', () => {
    cy.get('input[placeholder="Add new task..."]').type('Buy milk')
    cy.contains('Add Task').click()
    cy.contains('Buy milk').should('exist')
  })

  // TEST 2: Delete a task
  it('deletes a task', () => {
    cy.get('input[placeholder="Add new task..."]').type('Task to delete')
    cy.contains('Add Task').click()
    cy.contains('Task to delete').should('exist')
    cy.contains('tr', 'Task to delete').find('button[title="Delete Task"]').click()
    cy.contains('Task to delete').should('not.exist')
  })

  // TEST 3: Mark task as complete
  it('marks a task as completed', () => {
    cy.get('input[placeholder="Add new task..."]').type('Complete me')
    cy.contains('Add Task').click()
    cy.contains('tr', 'Complete me').find('input[type="checkbox"]').check()
    cy.contains('tr', 'Complete me').should('have.class', 'done')
  })

  // TEST 4: Search for a task
  it('searches for a task', () => {
    cy.get('input[placeholder="Search by task, priority, category..."]').type('Buy milk')
    cy.contains('Buy milk').should('exist')
  })

  // TEST 5: Edit a task
  it('edits a task', () => {
    cy.get('input[placeholder="Add new task..."]').type('Old task name')
    cy.contains('Add Task').click()
    cy.contains('tr', 'Old task name').find('button[title="Edit Task"]').click()
    cy.get('input[placeholder="Edit task..."]').clear().type('New task name')
    cy.contains('Update Task').click()
    cy.contains('New task name').should('exist')
  })

  // TEST 6: Filter completed tasks
  it('filters completed tasks', () => {
    cy.get('select.filter-dropdown').select('✅ Completed')
    cy.contains('Complete me').should('exist')
  })

  // TEST 7: Dark mode toggle
  it('toggles dark mode', () => {
    cy.contains('Dark Mode').click()
    cy.get('.app').should('have.class', 'dark')
  })

})
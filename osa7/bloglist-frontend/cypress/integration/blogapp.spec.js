describe('Blog app ', function() {
  // it('page can be opened', function() {
  //   cy.contains('Kirjaudu')
  // })

  it('name of the user is shown', function() {
    cy.contains('Test User logged in')
  })

  it('a new blog can be created', function() {
    cy.contains('create new')
      .click()
    cy.get('#title')
      .type('test title')
    cy.get('#author')
      .type('test author')
    cy.get('#url')
      .type('test url')
    cy.get('#create')
      .click()
    cy.contains('a new blog test title by test author added')
  })

  it('shows all blogs when pressing blogs from navigation', function() {
    cy.contains('create new')
      .click()
    cy.get('#title')
      .type('test title')
    cy.get('#author')
      .type('test author')
    cy.get('#url')
      .type('test url')
    cy.get('#create')
      .click()

    cy.contains('create new')
      .click()
    cy.get('#title')
      .type('test title2')
    cy.get('#author')
      .type('test author2')
    cy.get('#url')
      .type('test url2')
    cy.get('#create')
      .click()

    cy.contains('create new')
      .click()
    cy.get('#title')
      .type('test title3')
    cy.get('#author')
      .type('test author3')
    cy.get('#url')
      .type('test url3')
    cy.get('#create')
      .click()

    cy.contains('blogs')
      .click()
    cy.contains('test title')
    cy.contains('test title2')
    cy.contains('test title3')
  })

  it("it shows an individual blog's info when clicking the title", function() {
    cy.contains('create new')
      .click()
    cy.get('#title')
      .type('test title')
    cy.get('#author')
      .type('test author')
    cy.get('#url')
      .type('test url')
    cy.get('#create')
      .click()
    cy.get('#blogtitle')
      .click()

    cy.contains('test title by test author')
    cy.contains('test url')
    cy.contains('0 likes')
  })

  it('blogs can be liked and likes increment', function() {
    cy.contains('create new')
      .click()
    cy.get('#title')
      .type('test title')
    cy.get('#author')
      .type('test author')
    cy.get('#url')
      .type('test url')
    cy.get('#create')
      .click()
    cy.get('#blogtitle')
      .click()
    cy.get('#like')
      .click()

    cy.contains('1 likes')
  })

  it('shows all users when clicking users from navigation', function() {
    //add another user
    const user = {
      name: 'Pena',
      username: 'pena',
      password: 'anep'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')

    cy.contains('users')
      .click()
    cy.contains('blogs created')
    cy.contains('Test User')
    cy.contains('Pena')
  })

  it("shows user's info when clicking user's name in users-view", function() {
    cy.contains('users')
      .click()
    cy.get('#name')
      .click()
    cy.contains('Test User')
    cy.contains('added blogs')
  })
})

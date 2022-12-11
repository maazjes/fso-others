import blogs from "../../src/services/blogs"

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#loginForm')
  })

  describe('Login',function() {
    beforeEach(function() {
      const user = {
        name: 'asder asdersson',
        username: 'asder',
        password: 'asd'
      }
      cy.request('POST', 'http://localhost:3001/api/users', user)
      cy.visit('http://localhost:3000')
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('asder')
      cy.get('#password').type('asd')
      cy.get('#loginButton').click()
      cy.contains(`asder asdersson logged in`)
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('asder')
      cy.get('#password').type('wrong')
      cy.get('#loginButton').click()
      cy.contains(`wrong credentials`)
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      const user = {
        name: 'asder asdersson',
        username: 'asder',
        password: 'asd'
      }
      cy.request('POST', 'http://localhost:3001/api/users', user)
      cy.request('POST', 'http://localhost:3001/api/login', {username: user.username, password: user.password})
        .then(response => {
          localStorage.setItem('user', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
    })

    it('A blog can be created', function() {
      cy.contains('new note').click()
      cy.get('#title').type('asd')
      cy.get('#author').type('asder')
      cy.get('#url').type('asd.com')
      cy.get('#createButton').click()
      cy.contains('asd asder')
    })

    it('A blog can be liked', function() {
      cy.contains('new note').click()
      cy.get('#title').type('asd')
      cy.get('#author').type('asder')
      cy.get('#url').type('asd.com')
      cy.get('#createButton').click()
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('1 likes')
    })

    it('A blog can be liked', function() {
      cy.contains('new note').click()
      cy.get('#title').type('asd')
      cy.get('#author').type('asder')
      cy.get('#url').type('asd.com')
      cy.get('#createButton').click()
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'asd asder')
    })

    describe('and there are multiple blogs', function() {
      beforeEach(function() {
        const blogs = [
        {
          title: 'asder asdersson',
          author: 'asder',
          url: 'asd.com'
        },
        {
          title: 'basder basdersson',
          author: 'basder',
          url: 'basd.com'
        },
        {
          title: 'vasder vasdersson',
          author: 'vasder',
          url: 'vasd.com'
        }]
        for (let i = 0; i < blogs.length; i++) {
          cy.contains('new note').click()
          cy.get('#title').type(blogs[i].title)
          cy.get('#author').type(blogs[i].author)
          cy.get('#url').type(blogs[i].url)
          cy.get('#createButton').click()
        }
        cy.wait(500)
      })
      it.only('Blogs are ordered by likes', function() {
        cy.get('.viewButton').as('buttons')
        cy.get('@buttons').eq(0).click()
        cy.get('@buttons').eq(1).click()
        cy.get('@buttons').eq(2).click()
        cy.get('.likeButton').as('buttons')
        cy.wait(500)
        cy.get('@buttons').eq(0).click().click()
        cy.get('@buttons').eq(1).click().click().click()
        cy.get('@buttons').eq(2).click().click().click().click()
        cy.get('.blog').as('blogs')
        cy.wait(500)
        cy.get('@blogs').eq(0).contains('vasder vasdersson vasder')
        cy.get('@blogs').eq(1).contains('basder basdersson basder')
        cy.get('@blogs').eq(2).contains('asder asdersson asder')
      })
    })
  })
})
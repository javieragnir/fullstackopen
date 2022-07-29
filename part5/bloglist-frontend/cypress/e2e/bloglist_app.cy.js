describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Javier Agnir',
            username: 'jagnir',
            password: 'secret'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.get('.loginForm')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('jagnir')
            cy.get('#password').type('secret')
            cy.get('#loginButton').click()

            cy.contains('logged in successfully')
            cy.contains('jagnir logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('jagnir')
            cy.get('#password').type('wrongpassword')
            cy.get('#loginButton').click()

            cy.contains('wrong username or password').should('have.css', 'color', 'rgb(255, 0, 0)')
            cy.get('html').should('not.contain', 'jagnir logged in')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'jagnir', password: 'secret' })
        })

        it('A blog can be created', function() {
            cy.contains('add blog').click()
            cy.get('#title').type('Homestar Runner')
            cy.get('#author').type('The Chapman Brothers')
            cy.get('#url').type('https://homestarrunner.com')
            cy.get('#createButton').click()

            cy.contains('Homestar Runner The Chapman Brothers')
        })

        describe('When several blogs exist', function() {
            beforeEach(function() {
                cy.createBlog({ title: 'blog1', author: 'author1', url: 'https://www.url1.com' })
                cy.createBlog({ title: 'blog2', author: 'author2', url: 'https://www.url2.com' })
                cy.createBlog({ title: 'blog3', author: 'author3', url: 'https://www.url3.com' })
            })

            it.only('A blog can be liked', function() {
                cy.contains('blog1 author1').contains('view').click()
                cy.contains('blog1 author1').contains('like').click()
    
                cy.contains('blog1 author1').contains('likes 1')
            })
        })
    })
})

Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
        username, password
    }).then(({ body }) => {
        localStorage.setItem('loggedBloglistUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
    cy.request({
        url: 'http://localhost:3003/api/blogs/',
        method: 'POST',
        body: { title, author, url },
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBloglistUser')).token}`
        }
    })

    cy.visit('http://localhost:3000')
})
describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.createUser({
            name: 'Javier Agnir',
            username: 'jagnir',
            password: 'secret'
        })
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
                cy.createBlog({ title: 'A Blog', author: 'An Author', url: 'https://www.placeholder.com', likes: 0 })
                cy.createBlog({ title: 'The title with the least likes', author: 'author1', url: 'https://www.url1.com', likes: 1 })
                cy.createBlog({ title: 'The title with the second most likes', author: 'author2', url: 'https://www.url2.com', likes: 2 })
                cy.createBlog({ title: 'The title with the most likes', author: 'author3', url: 'https://www.url3.com', likes: 3 })
            })

            it('A blog can be liked', function() {
                cy.contains('A Blog An Author').contains('view').click()
                cy.contains('A Blog An Author').contains('like').click()

                cy.contains('A Blog An Author').contains('likes 1')
            })

            it('A blog can be deleted by the user that created it', function() {
                cy.contains('A Blog An Author').contains('delete').click()

                cy.get('html').should('not.contain', 'A Blog An Author')
            })

            it('Blogs are ordered according to likes', function() {
                cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
                cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
                cy.get('.blog').eq(2).should('contain', 'The title with the least likes')
            })

            it('A blog can not be deleted by a user that did not create it', function() {
                cy.createUser({
                    name: 'testuser',
                    username: 'testuser',
                    password: 'testuser',
                })

                cy.contains('logout').click()

                cy.on('uncaught:exception', function(err) {
                    expect(err.response.data.error).to.include('delete user does not match post user')
                    return false
                })

                cy.login({ username: 'testuser', password: 'testuser' })
                cy.contains('A Blog An Author').contains('delete').click()


                cy.contains('A Blog An Author')
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

Cypress.Commands.add('createBlog', ({ title, author, url, likes = 0 }) => {
    cy.request({
        url: 'http://localhost:3003/api/blogs/',
        method: 'POST',
        body: { title, author, url, likes },
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBloglistUser')).token}`
        }
    })

    cy.visit('http://localhost:3000')
})

Cypress.Commands.add('createUser', ({ name, username, password }) => {
    cy.request(
        'POST',
        'http://localhost:3003/api/users/',
        { name, username, password }
    )
    cy.visit('http://localhost:3000')
})
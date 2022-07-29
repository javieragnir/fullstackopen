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
})
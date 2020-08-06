describe("Blog app", function(){
    beforeEach(function(){
        cy.request('POST','http://localhost:3001/api/testing/reset')
        const user = {
            username : 'ninja',
            password: 'ninja',
            name: 'Master Ninja'
        }
        cy.request('POST','http://localhost:3001/api/users/',user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function(){
        cy.contains("Log in to application")
        cy.contains("username")
        cy.contains("password")
    })

    describe('Login',function(){
        it('succeeds with correct credentials', function (){
            cy.get('#username').type('ninja')
            cy.get('#password').type('ninja')
            cy.get('#login-button').click()
            cy.contains("Master Ninja logged in")
        })

        it('fails with wrong credentials', function(){
            cy.get('#username').type('ninja')
            cy.get('#password').type('wrong-password')
            cy.get('#login-button').click()
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
            cy.contains("invalid username or password")
        })
    })
})
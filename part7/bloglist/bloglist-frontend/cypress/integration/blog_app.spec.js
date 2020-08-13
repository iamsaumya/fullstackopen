const { func } = require("prop-types")

describe("Blog app", function(){
    beforeEach(function(){
        cy.request('POST','http://localhost:3001/api/testing/reset')
        const user = {
            username : 'ninja',
            password: 'ninja',
            name: 'Master Ninja'
        }
        cy.request('POST','http://localhost:3001/api/users/',user)

        const user2 = {
            username : 'Ninja',
            password: 'Ninja',
            name: 'God Ninja'
        }
        cy.request('POST','http://localhost:3001/api/users/',user2)
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

    describe('When logged in', function (){
        beforeEach(function(){
                const loggingUser = {
                    "username": 'ninja',
                    "password":  'ninja'
                }
                cy.login(loggingUser)
        })

        it('A blog can be created',function(){
            cy.contains('Create Blog').click()
            cy.get("#title").type("Test")
            cy.get("#author").type("ninja")
            cy.get("#url").type("www.testing.com")
            cy.get("#likes").type("3")
            
            cy.get("#create-button").click()
            cy.contains('Test ninja')
        })

        describe('and a blog exists',function(){
            beforeEach(function(){
                const body = {
                    title : 'test',
                    author: 'ninja',
                    url: 'www.test.com',
                    likes: 4
                }
                cy.createBlog(body)
            })

            it('user can like a blog',function(){
                cy.contains('view').click()
                cy.get('.like').click()
            })

            it('user who created the blog can delete it', function(){
                cy.contains('view').click()
                cy.get('.remove-button').click()
                cy.on('window:confirm',() => true)
            })

            it('user who did not created the blog cannot delete it', function() {
                cy.contains('Logout').click()
                const loggingUser = {
                    "username": 'Ninja',
                    "password":  'Ninja'
                }
                cy.login(loggingUser)
                cy.contains('view').click()
                cy.get('.remove-button').click()
                cy.on('window:confirm',() => true)
                cy.get('.error').should('contain','Unauthorized to access the blog')
                cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
            })

            describe('add a few more blogs',function(){
                beforeEach(function(){
                    const blog1 = {
                        title : 'test',
                        author: 'ninja',
                        url: 'www.test.com',
                        likes: 4
                    }
                    cy.createBlog(blog1)
                    const blog2 = {
                        title : 'test',
                        author: 'ninja',
                        url: 'www.test.com',
                        likes: 56
                    }
                    cy.createBlog(blog2)
                    const blog3 = {
                        title : 'test',
                        author: 'ninja',
                        url: 'www.test.com',
                        likes: 32
                    }
                    cy.createBlog(blog3)
                })

                it('and the first blog has maximum likes', function(){
                    cy.contains('view').click()
                    cy.get('.like').parent().as('likeblock')
                    cy.get('@likeblock').contains(56)
                })
            })
        })
    })
})
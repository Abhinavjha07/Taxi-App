const logIn = () => {
    const { username, password } = Cypress.env('credentials');

    cy.server();
    cy.route({
        method:'POST',
        url: '**/api/log_in/**',
        status: 200,
        response: {
            'access': 'ACCESS_TOKEN',
            'refresh': 'REFRESH_TOKEN'
        }
    }).as('logIn');

    cy.visit('/#/log-in');
    cy.get('input#username').type(username);
    cy.get('input#password').type(password, {log: false});
    cy.get('button').contains('Log In').click();
    cy.wait('@logIn');
};


describe('Authentication', function() {
    it('Can log in.', function() {
        
        logIn();
        cy.hash().should('eq', '#/');
        
    });

    it('Can Sign Up', function() {
        cy.server();
        cy.route({
            method: 'POST',
            url: '**/api/sign_up/**',
            status: 201,
            response: {
                'id': 1,
                'username': 'abhinav.jha@example.com',
                'first_name': 'Abhinav',
                'last_name': 'Jha',
                'group': 'driver',
                'photo': '/media/images/photo.jpg'
            }
        }).as('signUp');


        cy.visit('/#/sign-up');
        cy.get('input#username').type('abhinav.jha@example.com');
        cy.get('input#firstName').type('Abhinav');
        cy.get('input#lastName').type('Jha');
        cy.get('input#password').type('pAssw0rd', { log: false});
        cy.get('select#group').select('driver');

        cy.fixture('images/photo.jpg').then(photo => {
            cy.get('input#photo').attachFile({
                fileContent: photo,
                fileName: 'photo.jpg',
                mimeType: 'application/json'
            });
        });

        cy.get('button').contains('Sign Up').click();
        cy.wait('@signUp');
        cy.hash().should('eq', '#/log-in');
    });

    it('Cannot visit the login page when logged in.', function() {
        
        logIn();
        cy.visit('/#/log-in');
        cy.hash().should('eq', '#/');
    });

    it('Cannot visit the sign up page when logged in.', function() {
        logIn();

        cy.visit('/#/sign-up');
        cy.hash().should('eq', '#/');
    });

    it('Cannot see links when logged in.', function() {
        
        logIn();
        cy.get('button#signUp').should('not.exist');
        cy.get('button#logIn').should('not.exist');
    });

    it('Shows an alert on login error.', function() {
        const { username, password } = Cypress.env('credentials');
        cy.server();
        cy.route({
            method: 'POST',
            url: '**/api/log_in/**',
            status: 400,
            response: {
                '__all__': [
                    'Please enter a correct username and password. '+
                    'Note that both fields may be case-sensitive.'
                ]
            }
        }).as('logIn');

        cy.visit('/#/log-in');
        cy.get('input#username').type(username);
        cy.get('input#password').type(password, { log: false });
        cy.get('button').contains('Log In').click();
        cy.wait('@logIn');
        cy.get('div.alert').contains(
            'Please enter a correct username and password. '+
            'Note that both fields may be case-sensitive.'
        );

        cy.hash().should('eq', '#/log-in');
    });

    it('Can log out.', function() {
        logIn();

        cy.get('button').contains('Log Out').click().should(() => {
            expect(window.localStorage.getItem('taxi.auth')).to.be.null;
        });

        cy.get('button').contains('Log Out').should('not.exist');
    });

    it('Show invalid fields on sign up error.', function() {
        cy.server();
        cy.route({
            method: 'POST',
            url: '**/api/sign_up/**',
            status: 400,
            response: {
                'username': [
                    'A user with that username already exists.'
                ]
            }
        }).as('signUp');


        cy.visit('/#/sign-up');
        cy.get('input#username').type('abhinav.jha@example.com');
        cy.get('input#firstName').type('Abhinav');
        cy.get('input#lastName').type('Jha');
        cy.get('input#password').type('pAssw0rd', { log: false});
        cy.get('select#group').select('driver');

        cy.fixture('images/photo.jpg').then(photo => {
            cy.get('input#photo').attachFile({
                fileContent: photo,
                fileName: 'photo.jpg',
                mimeType: 'application/json'
            });
        });

        cy.get('button').contains('Sign Up').click();
        cy.wait('@signUp');
        cy.get('div.invalid-feedback').contains(
            'A user with that username already exists.'
        );

        cy.hash().should('eq', '#/sign-up');

    });
})
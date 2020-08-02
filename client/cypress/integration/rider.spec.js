const logIn = () => {
    const { username, password } = Cypress.env('rider');
    cy.server() 
    cy.route('POST', '**/api/log_in/').as('logIn')

    cy.visit('/#/log-in')
    cy.get('input#username').type(username)
    cy.get('input#password').type(password, { log: false })
    cy.get('button').contains('Log In').click()
    cy.wait('@logIn')
};

describe('The rider dashboard', function() {

    before(function() {
        cy.loadUserData();
    })

    it('Can not be visited if the user is not a rider', function() {
        
        const {username, password} = Cypress.env('driver')
        cy.server()
        cy.route('POST', '**/api/log_in/').as('logIn')
    
        cy.visit('/#/log-in')
        cy.get('input#username').type(username)
        cy.get('input#password').type(password, { log: false })
        cy.get('button').contains('Log In').click()
        cy.hash().should('eq', '#/')
        cy.get('button').contains('Log Out')
        cy.wait('@logIn')

        cy.visit('/#/rider')
        cy.hash().should('eq', '#/')
    });

    it('Can be visited if the user is a rider', function() {
        const { username, password } = Cypress.env('rider')

        cy.server()
        cy.route('POST', '**/api/log_in/').as('logIn')
    
        cy.visit('/#/log-in')
        cy.get('input#username').type(username)
        cy.get('input#password').type(password, { log: false })
        cy.get('button').contains('Log In').click()
        cy.hash().should('eq', '#/')
        cy.get('button').contains('Log Out')
        cy.wait('@logIn')

        cy.visit('/#/rider')
        cy.hash().should('eq', '#/rider')
    });

    context('When there are no trips', function() {
        before(function () {
            cy.task('tableTruncate', {
                table: 'trips_trip'
            });
        });

        it('Displays messages for no trips', function () {
            cy.server();
            cy.route('GET', '**/api/trip/').as('getTrips');

            logIn();

            cy.visit('/#/rider');
            cy.wait('@getTrips');

            cy.get('[data-cy=trip-card]')
                .eq(0)
                .contains('No trips.');

            cy.get('[data-cy=trip-card]')
                .eq(1)
                .contains('No trips.');
        });
    });

    context('When there are trips', function() {
        before(function () {
            cy.loadTripData();
        });

        it('Displays current and completed trips', function () {
            cy.server();
            cy.route('GET', '**/api/trip/').as('getTrips');

            logIn();

            cy.visit('/#/rider');
            cy.wait('@getTrips');

            cy.get('[data-cy=trip-card]')
                .eq(0)
                .contains('STARTED');

            cy.get('[data-cy=trip-card]')
                .eq(1)
                .contains('COMPLETED');
        });
    });
})
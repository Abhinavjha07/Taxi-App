const logIn = () => {
    const { username, password } = Cypress.env('driver');
    cy.server();
    cy.route('POST', '**/api/log_in/').as('logIn')

    cy.visit('/#/log-in')
    cy.get('input#username').type(username)
    cy.get('input#password').type(password, {log: false})
    cy.get('button').contains('Log In').click()
    cy.wait('@logIn')

}

describe('The driver dashboard', function() {
    before(function() {
        cy.loadUserData();
    })

    it('Can not be visited if the user is not a driver', function() {
        const { username, password } = Cypress.env('rider')
        cy.server()
        cy.route('POST', '**/api/log_in/').as('logIn')
    
        cy.visit('/#/log-in')
        cy.get('input#username').type(username)
        cy.get('input#password').type(password, {log: false})
        cy.get('button').contains('Log In').click()
        cy.hash().should('eq', '#/')
    
        cy.get('button').contains('Log Out')
        cy.wait('@logIn')

        cy.visit('/#/driver')
        cy.hash().should('eq', '#/')
    });

    it('Can be visited if the user is a driver', function() {
        logIn();
        cy.visit('/#/driver')
        cy.hash().should('eq', '#/driver')
    });

    context('When there are no trips', function () {
        before(function() {
            cy.task('tableTruncate', {
                table: 'trips_trip'
            });
        });

        it('Displays message for no trips', function() {
            cy.server();
            cy.route('GET', '**/api/trip/').as('getTrips');

            logIn();
            cy.visit('/#/driver')
            cy.wait('@getTrips');


           cy.get('[data-cy=trip-card]')
           .eq(0)
           .contains('No trips.');


           cy.get('[data-cy=trip-card]')
           .eq(1)
           .contains('No trips.');

           cy.get('[data-cy=trip-card]')
           .eq(2)
           .contains('No trips.');

            
        });
    });

    context('When there are trips', function () {
        before(function() {
            cy.loadTripData();
        });

        it('Displays current, requested and completed trips', function() {
            cy.server();
            cy.route('GET', '**/api/trip/').as('getTrips');

            logIn();
            cy.visit('/#/driver')
            cy.wait('@getTrips');


           cy.get('[data-cy=trip-card]')
           .eq(0)
           .contains('STARTED');


           cy.get('[data-cy=trip-card]')
           .eq(1)
           .contains('REQUESTED');

           cy.get('[data-cy=trip-card]')
           .eq(2)
           .contains('COMPLETED');

            
        });
    });

    it('Shows details about a trip', () => {
        const tripId = "676cb20b-d51d-44b5-951a-3e3c72a42668";

        cy.server();
        cy.route('GET', '**/api/trip/*/').as('getTrip');

        logIn();

        cy.visit('/#/driver/${tripId}');

        cy.wait('@getTrip');

        cy.get('[data-cy=trip-card]')
            .should('have.length', 1)
            .and('contain.text', 'Aman Sharma')
            .and('contain.text', 'STARTED');
    });
})
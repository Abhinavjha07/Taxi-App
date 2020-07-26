describe('Authentication', function() {
    it('Can log in.', function() {
        cy.visit('/#/log-in');
        cy.get('input#username').type('abhinav.jha@example.com');
        cy.get('input#password').type('pAssw0rd', {log:false});
        cy.get('button').contains('Log In').click();
        cy.hash().should('eq', '#/');
    });

    it('Can Sign Up', function() {
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
        cy.hash().should('eq', '#/log-in');
    });
});
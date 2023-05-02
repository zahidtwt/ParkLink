const delay = 500;

describe('template spec', () => {
  it('passes', () => {
    cy.visit('/');

    cy.wait(delay);
    cy.get('button').click();
    cy.wait(delay);
    cy.get('button').click();
    cy.wait(delay);
    cy.get('button').click();
    cy.get('input').type('12345678910');
    cy.get('button').contains('Next').click();
    // cy.get('button').contains('Create Account').click();
  });
});

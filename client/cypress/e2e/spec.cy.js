const delay = 1000;

describe('template spec', () => {
  it('should create an user and login to main page to and check whether main page contains ParkLink', () => {
    cy.visit('/');

    // Truthy test
    cy.wait(delay);
    cy.get('button').click();
    cy.wait(delay);
    cy.get('button').click();
    cy.wait(delay);
    cy.get('button').click();
    cy.wait(delay);
    cy.get('input').type('12345678910');
    cy.wait(delay);
    cy.get('button').click();
    cy.wait(delay);
    cy.get('#password').type('123456');
    cy.wait(delay);
    cy.get('button').click();
    cy.contains('ParkLink');

    // logged in to the main page
  });

  it('should show password does not match if login credentials are wrong', () => {
    //   // falsy test
    cy.visit('/');
    cy.wait(delay);
    cy.get('button').click();
    cy.wait(delay);
    cy.get('button').click();
    cy.wait(delay);
    cy.get('button').click();
    cy.get('input').type('12345678910');
    cy.get('button').click();
    cy.get('#password').type('1234567');
    cy.get('button').click();
    cy.contains("Password doesn't match");
  });
});

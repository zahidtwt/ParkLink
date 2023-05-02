const convertTo12Hour = require('../../src/utils/convetTo12Hour/convertTo12Hour');

const delay = 500;

describe('template spec', () => {
  it('should create an user and login to main page to and check whether main page contains ParkLink', () => {
    let bikeSlot = 0;
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
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    // cy.get('div[data-index="4"]').click();
    cy.contains('Vatara').click();

    cy.get('[data-test-id="bike-slot"]').then((div) => {
      bikeSlot = div.text();
      cy.contains('Book Parking').click();
      cy.get('[data-test-id="booking-select"]').select('Bike');
      const time = new Date().getHours() + 1;
      const a = convertTo12Hour(time + ':00');
      console.log(a);
      cy.get('[data-test-id="start-time-select"]').select(a);
      // cy.get('[data-test-id="end-time-select"]').select('Bike');
      cy.contains('Review Booking').click();
      cy.contains('Pay Later & Book').click();
      cy.contains('Go to Dashboard').click();
      cy.contains('Vatara').click();
      cy.get('[data-test-id="bike-slot"]').then((div) => {
        console.log('saddsa', +bikeSlot - 1, +div.text());
        expect(+bikeSlot - 1).equal(+div.text());
      });
      //   cy.get('[data-test-id="bike-slot"]').select(a);
      // cy.get('.marker').click();
      // logged in to the main page
    });
  });
});

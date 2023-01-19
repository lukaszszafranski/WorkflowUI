import { LoginPage } from "../support/Pages/logInPage";

describe('Main Page', () => {

    beforeEach(() => {
        cy.visit('https://portale-korporacyjne.azurewebsites.net/login')
        
        const loginPage = new LoginPage();
        var username = 'ŁUKASZ.TOPAJAC';
        var password = '123456';
    
        loginPage.logInUsingCredentials(username, password);
      });

it('After successful login the main page should be displayed', () => {
     cy.get('span').should('contain.text', 'Dashboard'); 
});

it.only('As a user I want to be redirected to Projects List', () => {

    cy.get('#accordionSidenav > [routerlink="/projects-list"]').click();
    cy.get('span').should('contain.text', 'Projects'); 
    cy.url().should('eq', 'https://portale-korporacyjne.azurewebsites.net/projects-list')
});

it.only('As a user I want to be redirected to Timesheets', () => {
    cy.get('#accordionSidenav > [routerlink="/timesheets-list"]').click();
    cy.get('span').should('contain.text', 'Timesheets'); 
    cy.url().should('eq', 'https://portale-korporacyjne.azurewebsites.net/timesheets-list')
});

it.only('As a user I want to be redirected to Review Timesheets', () => {
    cy.get('#accordionSidenav > [routerlink="/timesheets-review"]').click();
    cy.get('span').should('contain.text', 'Timesheets'); 
    cy.url().should('eq', 'https://portale-korporacyjne.azurewebsites.net/timesheets-review')
});

it.only('As a user I want to be redirected to Chat', () => {
    cy.get('#accordionSidenav > [routerlink="/chat"]').click();
    cy.get('span').should('contain.text', 'Chat'); 
    cy.url().should('eq', 'https://portale-korporacyjne.azurewebsites.net/chat')
});

})
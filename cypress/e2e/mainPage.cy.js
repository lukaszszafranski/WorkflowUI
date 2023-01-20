import { LoginPage } from "../support/Pages/logInPage";
import { Redirects } from "../support/Pages/redirects";

describe('Main Page', () => {

    beforeEach(() => {
        cy.visit('https://portale-korporacyjne.azurewebsites.net/login')
        
        const loginPage = new LoginPage();
        var username = 'AutomationTests';
        var password = '123456';
    
        loginPage.logInUsingCredentials(username, password);
      });

it('After successful login the main page should be displayed', () => {
     cy.get('span').should('contain.text', 'OverviewLegendLegend'); 
});

it('As a user I want to be redirected to Projects List', () => {
    const redirects = new Redirects();
    redirects.redirectToProjectsPage();
  
    cy.url().should('eq', 'https://portale-korporacyjne.azurewebsites.net/projects-list')
});

it('As a user I want to be redirected to Timesheets', () => {
    const redirects = new Redirects();
    redirects.redirectToTimesheetsPage();
  
    cy.url().should('eq', 'https://portale-korporacyjne.azurewebsites.net/timesheets-list')
});


it('As a user I want to be redirected to Chat', () => {
    const redirects = new Redirects();
    redirects.redirectToChatPage();
  
    cy.url().should('eq', 'https://portale-korporacyjne.azurewebsites.net/chat')
});

})
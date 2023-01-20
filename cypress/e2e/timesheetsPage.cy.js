import { LoginPage } from "../support/Pages/logInPage";
import { Redirects } from "../support/Pages/redirects";

describe('Timesheets Page', () => {

    beforeEach(() => {
        cy.visit('https://portale-korporacyjne.azurewebsites.net/login')
        
        const loginPage = new LoginPage();
        const redirects = new Redirects();

        var username = 'AutomationTests';
        var password = '123456';
    
        loginPage.logInUsingCredentials(username, password);
        redirects.redirectToTimesheetsPage();
    })

it.only('As a user I want to open first timesheet from the top', () => {
    cy.get('.card-header').contains('Styczeń 2023').click();
    cy.get('.page-header-title').should('contain.text', 'Styczeń 2023');
});
})
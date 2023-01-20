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

it.skip('As a user I want to create a new timesheet', () => {
    cy.get('.page-header-title > .btn').contains('Add new Timesheet').click();
});
})
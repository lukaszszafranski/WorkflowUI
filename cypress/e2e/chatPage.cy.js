import { LoginPage } from "../support/Pages/logInPage";
import { Redirects } from "../support/Pages/redirects";

describe('Chat Page', () => {

    beforeEach(() => {
        cy.visit('https://portale-korporacyjne.azurewebsites.net/login')
        
        const loginPage = new LoginPage();
        const redirects = new Redirects();

        var username = 'AutomationTests';
        var password = '123456';
    
        loginPage.logInUsingCredentials(username, password);
        redirects.redirectToChatPage();
    })

it('As a user I want to send a message on the chat', () => {
    const message = ('Wiadomość z:' + Date.now());

    cy.get('.form-control').type(message, {force: true})
    cy.get('.btn-message').click();
    cy.get('.btn-blue').should('contain.text', message);
});
})
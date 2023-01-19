import { LoginPage } from "../support/Pages/logInPage";

describe('Login page', () => {

  before (() => {

  })

  beforeEach(() => {
    cy.visit('https://portale-korporacyjne.azurewebsites.net/login')

  });

  
  it('After entering login page user can see the "Sign In" header', () => {
    cy.get('.card-body.text-center').should('contain.text', "Sign In")
  })

  it.skip('After entering login page user can see the login form', () => {
    cy.get('form.ng-untouched').should('be.visible');
  })

  it.only('User should be able to log in using correct credentials', () => {
    const loginPage = new LoginPage();

    var username = 'ŁUKASZ.TOPAJAC';
    var password = '123456';

    loginPage.logInUsingCredentials(username, password);

    cy.get('.ng-trigger').should('contain.text', 'Login successful')

  });

  it('User should not be able to log in using incorrect credentials', () => {
    const loginPage = new LoginPage();

    var username = 'fakeUsername';
    var password = 'fakePassword';

    loginPage.logInUsingCredentials(username, password);

    cy.get('#toast-container > .ng-trigger').should('contain.text', 'Username or password is incorrect');
  });

  it('User should not be able to log in using blank username', () => {
    const loginPage = new LoginPage();

    var username = ' ';
    var password = 'fakePassword';

    loginPage.logInUsingCredentials(username, password);

    cy.get('#toast-container > .ng-trigger').should('contain.text', ' Bad Request ');
  });

  it('User should not be able to log in using blank password', () => {
    const loginPage = new LoginPage();

    var username = 'fakeUsername';
    var password = ' ';

    loginPage.logInUsingCredentials(username, password);

    cy.get('#toast-container > .ng-trigger').should('contain.text', ' Bad Request ');
  });
})



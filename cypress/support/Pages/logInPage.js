class LoginPage{

logInUsingCredentials(username, password){
    cy.get('[formcontrolname="username"]').should('be.visible');
    cy.get('[formcontrolname="username"]').type(username);

    cy.get('[formcontrolname="password"]').should('be.visible');
    cy.get('[formcontrolname="password"]').type(password);

    cy.get('.btn').contains('Login').click();

    cy.wait(1000);
}


}

export {LoginPage};
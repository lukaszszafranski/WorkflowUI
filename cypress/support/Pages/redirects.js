class Redirects{
redirectToProjectsPage(){
    cy.get('#accordionSidenav > [routerlink="/projects-list"]').click();
    cy.get('span').should('contain.text', 'Projects'); 
}
redirectToTimesheetsPage(){
    cy.get('#accordionSidenav > [routerlink="/timesheets-list"]').click();
    cy.get('span').should('contain.text', 'Timesheets'); 
}
redirectToReviewTimesheetsPage(){
    cy.get('#accordionSidenav > [routerlink="/timesheets-review"]').click();
    cy.get('span').should('contain.text', 'Timesheets'); 
}
redirectToChatPage(){
    cy.get('[routerlink="/chat"]').click();
    cy.get('span').should('contain.text', 'Chat'); 
}
}

export {Redirects}
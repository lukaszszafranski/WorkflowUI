class ProjectsPage{     
    generateRandomName(){
        const uuid = () => Cypress._.random(0, 1e6)
        const id = uuid()
        const fakeName = `FakeName${id}`

        return fakeName;
    }
    createNewProjectWithRandomName(fakeName){
        cy.get('.btn').contains('Add project').click();
        cy.get('.modal-header').should('contain.text', 'Add your project');
        cy.get('label').contains('Project name').parents().find('input').type(fakeName);
        cy.get('.btn').contains('Save changes').click();
    }
    }
    
    export {ProjectsPage};
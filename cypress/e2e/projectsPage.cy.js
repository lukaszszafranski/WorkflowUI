import { LoginPage } from "../support/Pages/logInPage";
import { ProjectsPage } from "../support/Pages/projectsPage";
import { Redirects } from "../support/Pages/redirects";

describe('Projects Page', () => { 
    beforeEach(() => {
        cy.visit('https://portale-korporacyjne.azurewebsites.net/login')
        
        const loginPage = new LoginPage();
        const redirects = new Redirects();
        var username = 'AutomationTests';
        var password = '123456';
    
        loginPage.logInUsingCredentials(username, password);

        redirects.redirectToProjectsPage();
    })

    it('User should be able to add new project', () => {
        const projectsPage = new ProjectsPage();
        const fakeProjectName = projectsPage.generateRandomName();
        projectsPage.createNewProjectWithRandomName(fakeProjectName);
        cy.wait(1500);
        cy.get('#toast-container > .ng-trigger').contains('You created ' + fakeProjectName + ' Project!');
    });

    it('Newly created project should be visible on the list of projects', () => {
        const projectsPage = new ProjectsPage();
        const redirects = new Redirects();

        const fakeProjectName = projectsPage.generateRandomName();
        projectsPage.createNewProjectWithRandomName(fakeProjectName);

        redirects.redirectToProjectsPage();
        cy.get('.card-body').should('contain', fakeProjectName);
    });

    it('User should be able to open newly created project', () => {
        const projectsPage = new ProjectsPage();
        const redirects = new Redirects();

        const fakeProjectName = projectsPage.generateRandomName();
        projectsPage.createNewProjectWithRandomName(fakeProjectName);

        redirects.redirectToProjectsPage();
        cy.get('.card-body').contains(fakeProjectName).click();
        cy.get('span').should('contain.text', fakeProjectName);
    });

    it('User should be able to edit project name', () => {
        const projectsPage = new ProjectsPage();
        const redirects = new Redirects();

        const fakeProjectName = projectsPage.generateRandomName();
        const editedFakeProjectName = fakeProjectName+'edited';
        projectsPage.createNewProjectWithRandomName(fakeProjectName);

        redirects.redirectToProjectsPage();
        cy.get('.card-body').contains(fakeProjectName).click();

        cy.get('[data-target="#editProjectModal"]').click();
        cy.get('#editProjectModal > .modal-dialog > .modal-content > .modal-body > .ng-invalid > .form-group > .form-control').clear();
        cy.wait(500);
        cy.get('#editProjectModal > .modal-dialog > .modal-content > .modal-body > .ng-invalid > .form-group > .form-control').type(editedFakeProjectName);
        cy.wait(500);
        cy.get('.btn').contains('Save changes').click();
        cy.get('span').should('contain.text', editedFakeProjectName);

    });

    it('User should be able to delete  project', () => {
        const projectsPage = new ProjectsPage();
        const redirects = new Redirects();

        const fakeProjectName = projectsPage.generateRandomName();
        projectsPage.createNewProjectWithRandomName(fakeProjectName);

        redirects.redirectToProjectsPage();
        cy.get('.card-body').contains(fakeProjectName).click();

        cy.get('.page-header-title > .btn-red').click();

        cy.wait(1000);
        cy.get('#toast-container > .ng-trigger').should('contain.text', 'Project ' + fakeProjectName + ' was removed!');
    });
})

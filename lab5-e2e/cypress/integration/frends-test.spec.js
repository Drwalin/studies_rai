const URL = 'https://localhost:7292';

Cypress.Commands.add('login', (username) => {
	cy.visit(URL);
	cy.get('#name').type(username);
	cy.get('#submit_login').click();
});

Cypress.Commands.add('add_user', (username) => {
	cy.visit(URL + '/User/AddView');
	cy.get('#name').type(username);
	cy.get('#submit_add_user').click();
});

Cypress.Commands.add('delete_user', (username) => {
	cy.login('admin');
	cy.get('button#delete_'+username).click();
});

const userA = 'usera';
const userB = 'userb';

describe('Test friends', ()=> {
	
	beforeEach(() => {
		cy.add_user(userA);
		cy.add_user(userB);
	});

	afterEach(() => {
		cy.delete_user(userA);
		cy.delete_user(userB);
		cy.visit(URL);
	})

	it('Test is logged in', ()=>{
		cy.login(userA);

		cy.get('main h2').should('have.html', 'Logged in: ' + userA);
	});

	it('Test add friend', ()=>{
		cy.login(userA);

		cy.get('button#add_friend').click();
		cy.get('input#friend').type(userB);
		cy.get('input#submit_add').click();

		cy.get('main h2').should('have.html', 'Logged in: ' + userA);
	});



});
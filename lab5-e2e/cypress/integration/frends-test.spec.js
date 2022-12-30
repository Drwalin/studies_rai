const URL = 'https://localhost:7292';

function HasElement(predicate1, predicate) {
	return cy.get(predicate1).find(predicate).length > 0;
}

Cypress.Commands.add('login', (username) => {
	cy.visit(URL);
	cy.get('#name').type(username);
	cy.get('#submit_login').click();
});

Cypress.Commands.add('delete_user', (username) => {
	cy.login('admin');
	//if(HasElement('#UserDivIdAdmin', 'button#delete_'+username)) {
		cy.get('button#delete_'+username).click();
	//}
});

Cypress.Commands.add('add_user', (username) => {
	//cy.delete_user(username);
	cy.visit(URL + '/User/AddView');
	cy.get('#name').type(username);
	cy.get('#submit_add_user').click();
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

		cy.get('button#remove_friend_'+userB);
	});

	it('Test second friend has first friend', ()=>{
		cy.login(userA);
		cy.get('button#add_friend').click();
		cy.get('input#friend').type(userB);
		cy.get('input#submit_add').click();

		cy.login(userB);

		cy.get('button#remove_friend_'+userA);
	});

	it('Test remove friend', ()=>{
		cy.login(userA);
		cy.get('button#add_friend').click();
		cy.get('input#friend').type(userB);
		cy.get('input#submit_add').click();

		cy.login(userA);
		cy.get('button#remove_friend_'+userB).click();
		cy.get('button#remove_friend_'+userA).should('not.exist');
	});




});
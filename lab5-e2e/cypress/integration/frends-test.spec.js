const URL = 'https://localhost:7292';

Cypress.Commands.add('login', (username) => {
	cy.visit(URL);
	cy.get('input#name').type(username);
	cy.get('input#submit_login').click();
});

Cypress.Commands.add('delete_user', (username) => {
	//cy.visit(URL+'/User/Del?admin=admin&name='+username);
	cy.downloadFile(URL+'/User/Del?admin=admin&name='+username, 'cypress/fixtures/Download/Tmp', 'friends.json');
});

Cypress.Commands.add('add_user', (username) => {
	cy.delete_user(username);
	cy.visit(URL + '/User/AddView');
	cy.get('input#name').type(username);
	cy.get('input#submit_add_user').click();
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
	
	it('Test is new user logged in', ()=>{
		// Act
		cy.login(userA);

		// Assert
		cy.get('main h2').should('have.html', 'Logged in: ' + userA);
	});

	it('Test add friend', ()=>{
		// Arrange
		cy.login(userA);

		// Act
		cy.get('button#add_friend').click();
		cy.get('input#friend').type(userB);
		cy.get('input#submit_add').click();

		// Assert
		cy.get('button#remove_friend_'+userB);
	});

	it('Test second friend has first friend', ()=>{
		// Arrange
		cy.login(userA);
		cy.get('button#add_friend').click();
		cy.get('input#friend').type(userB);
		cy.get('input#submit_add').click();

		// Act
		cy.login(userB);

		// Assert
		cy.get('button#remove_friend_'+userA);
	});

	it('Test remove friend', ()=>{
		// Arrange
		cy.login(userA);
		cy.get('button#add_friend').click();
		cy.get('input#friend').type(userB);
		cy.get('input#submit_add').click();

		// Act
		cy.login(userA);
		cy.get('button#remove_friend_'+userB).click();

		// Assert
		cy.get('button#remove_friend_'+userB).should('not.exist');
	});

	it('Test upload friends list', ()=>{
		// Arrange
		cy.login(userA);

		// Act
		/*
		cy.request("POST", URL+'/Friends/Import', {
			name: userA,
			body: '{"friends":["userb"]}'
		});
		*/
		cy.get('button#import_export_friends').click();
		cy.get('input#file').attachFile(['friends.json']);
		cy.get('input[type="submit"]').click();

		// Assert
		cy.login(userA);
		cy.get('button#remove_friend_'+userB);
	});

	it('Test download friends list', ()=>{
		// Arrange
		cy.login(userA);
		cy.get('button#add_friend').click();
		cy.get('input#friend').type(userB);
		cy.get('input#submit_add').click();

		// Act
		cy.downloadFile(URL+'/Friends/Export?name='+userA, 'cypress/fixtures/Download', 'friends.json');

		// Assert
		cy.readFile('cypress/fixtures/Download/friends.json').its('friends').should('include', userB);
		cy.readFile('cypress/fixtures/Download/friends.json').its('friends').should('lengthOf', 1);
	});




});
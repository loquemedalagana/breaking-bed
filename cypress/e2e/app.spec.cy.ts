// @ts-ignore
describe('show pages correctly', () => {
  it('show character list', () => {
    cy.visit('/');
    cy.wait(3000);
  });

  it('show character detail', () => {
    const [RANDOM_CHARACTER_ID_MIN, RANDOM_CHARACTER_ID_MAX] = [1, 30];
    const randomCharacterId = Math.floor(Math.random() * (RANDOM_CHARACTER_ID_MAX - RANDOM_CHARACTER_ID_MIN) + 1);
    cy.visit(`/${randomCharacterId}`);
  });

  it('switch the language', () => {
    cy.get('header').get('select').select('es');
    cy.wait(1000);
    cy.get('table').contains('td', 'estado');
  });

  it('show error page', () => {
    const sampleInvalidUrl = '/hello/world';
    cy.visit(sampleInvalidUrl);
    cy.wait(3000);
  });
});

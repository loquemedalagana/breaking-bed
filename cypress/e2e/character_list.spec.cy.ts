import 'cypress-if';

import { getSampleDataList } from './mockedCharacterList';

describe('e2e test of the character list', () => {
  it('should have the right initial state before loading', () => {
    cy.visit('/');
    cy.window()
      .its('store')
      .invoke('getState')
      .should('deep.equal', {
        characterList: {
          page: 0,
          data: [],
          error: null,
          loading: false,
          isReachedEnd: false,
        },
      });
  });

  context('check the first loading', () => {
    const [prevList, nextList] = getSampleDataList(1);
    it('check the first page loading', () => {
      cy.get('#item-loading')
        .if()
        .window()
        .its('store')
        .invoke('getState')
        .should('deep.equal', {
          characterList: {
            page: 0,
            data: [],
            error: null,
            loading: true,
            isReachedEnd: false,
          },
        })
        .wait(2000)
        .window()
        .its('store')
        .invoke('getState')
        .its('characterList')
        .its('data')
        .its('length')
        .should('deep.equal', prevList.length)
        .else()
        .log('The data is not fetched or was already fetched');
    });

    it('to check scroll down and next data will be fetched.', () => {
      cy.scrollTo('bottom');
      cy.get('#character-list-bottom');
      cy.get('#item-loading')
        .if()
        .window()
        .its('store')
        .invoke('getState')
        .its('characterList')
        .its('loading')
        .should('deep.equal', true)
        .else()
        .log('Data was already loaded');
      cy.wait(2000);
      cy.window()
        .its('store')
        .invoke('getState')
        .its('characterList')
        .its('data')
        .its('length')
        .should('be.greaterThan', prevList.length);
    });

    it('go to character detail page', () => {
      const [RANDOM_CHARACTER_ID_MIN, RANDOM_CHARACTER_ID_MAX] = [1, 8];
      const randomCharacterId = Math.floor(Math.random() * (RANDOM_CHARACTER_ID_MAX - RANDOM_CHARACTER_ID_MIN) + 1);
      cy.get(`#character-list-item-${randomCharacterId}`).contains('a').click();
      cy.location('pathname').should('equal', `/${randomCharacterId}`);
    });
  });
});

import 'cypress-if';

import mockedCharacterList from './mockedCharacterList';
import Character, { ServerCharacterData } from '../../src/models/Character';
import { GET_CHARACTERS, GET_QUOTES } from './apiURLforTest';

const CHARACTER_DETAIL_BAD_REQUEST = 'character-detail-bad-request';
const CHARACTER_DETAIL_REQUEST = 'character-detail-request';
const CHARACTER_QUOTE_REQUEST = 'character-quote-request';

describe('e2e test of the character detail page', () => {
  const [RANDOM_CHARACTER_ID_MIN, RANDOM_CHARACTER_ID_MAX] = [1, 30];
  const randomCharacterId = Math.floor(Math.random() * (RANDOM_CHARACTER_ID_MAX - RANDOM_CHARACTER_ID_MIN) + 1);
  const fetchedCharacterData = mockedCharacterList.filter(data => data.char_id === randomCharacterId);
  const mockedCharacterData = new Character(fetchedCharacterData[0] as ServerCharacterData);
  const enCodedCharacterName = mockedCharacterData.name.replace(' ', '+');

  beforeEach(() => {
    cy.intercept('GET', `${GET_CHARACTERS}/${randomCharacterId}`).as(CHARACTER_DETAIL_REQUEST);
    cy.intercept('GET', `${GET_QUOTES}${enCodedCharacterName}`).as(CHARACTER_QUOTE_REQUEST);
  });

  it('to load correct character info', () => {
    cy.visit(`/${randomCharacterId}`);
    cy.get('#page-loading');
    cy.wait(`@${CHARACTER_DETAIL_REQUEST}`)
      .its('response.body')
      .should(data => {
        expect(data[0].char_id).to.be.eq(randomCharacterId);
      });
  });

  it('to request loading a quote', () => {
    cy.get('#item-loading');
    cy.wait(`@${CHARACTER_QUOTE_REQUEST}`).its('response.statusCode').should('eq', 200);
  });

  it('to check the function of quote load button', () => {
    cy.get('#refresh-quote-button')
      .if()
      .click()
      .get('#item-loading')
      .wait(`@${CHARACTER_QUOTE_REQUEST}`)
      .its('response.body')
      .should('not.be.null')
      .then(data => {
        if (data.length > 0) {
          expect(data[0].author).to.be.eq(mockedCharacterData.name);
        }
      })
      .else()
      .log(`The Quote doesn't exist`);
  });
});

describe('to test invalid request', () => {
  const wrongId = 'blabla';
  beforeEach(() => {
    cy.intercept('GET', `${GET_CHARACTERS}/${wrongId}`).as(CHARACTER_DETAIL_BAD_REQUEST);
    cy.visit('/');
    cy.visit(`/${wrongId}`);
  });

  it('to receive error code', () => {
    cy.get('#page-loading');
    cy.wait(`@${CHARACTER_DETAIL_BAD_REQUEST}`).its('response.statusCode').should('eq', 500);
  });

  it('detect go back button and redirect to previous page', () => {
    cy.get('#go-back-button').click();
    cy.location('pathname').should('equal', '/');
  });
});

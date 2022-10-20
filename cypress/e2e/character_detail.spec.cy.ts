import characterList from '../../src/tests/mocks/characterList';
import Character, { ServerCharacterData } from '../../src/models/Character';
import { GET_CHARACTERS, GET_QUOTES } from './apiURLforTest';

const CHARACTER_DETAIL_BAD_REQUEST = 'character-detail-bad-request';
const CHARACTER_DETAIL_REQUEST = 'character-detail-request';
const CHARACTER_QUOTE_REQUEST = 'character-quote-request';

describe('the character detail page is functioned correctly', () => {
  const [RANDOM_CHARACTER_ID_MIN, RANDOM_CHARACTER_ID_MAX] = [1, 30];
  const randomCharacterId = Math.floor(Math.random() * (RANDOM_CHARACTER_ID_MAX - RANDOM_CHARACTER_ID_MIN) + 1);
  const fetchedCharacterData = characterList.filter(data => data.char_id === randomCharacterId);
  const mockedCharacterData = new Character(fetchedCharacterData[0] as ServerCharacterData);
  const enCodedCharacterName = mockedCharacterData.name.replace(' ', '+');

  beforeEach(() => {
    cy.intercept('GET', `${GET_CHARACTERS}/${randomCharacterId}`).as(CHARACTER_DETAIL_REQUEST);
    cy.intercept('GET', `${GET_QUOTES}${enCodedCharacterName}`).as(CHARACTER_QUOTE_REQUEST);
  });

  beforeEach(() => {
    cy.visit(`/${randomCharacterId}`);
  });

  it('to show loading component', () => {
    cy.get('#page-loading');
  });

  context('to load character info correctly', () => {
    it('to check loaded character info correctly', () => {
      cy.wait(`@${CHARACTER_DETAIL_REQUEST}`).its('response.statusCode').should('eq', 200);
      cy.get(`@${CHARACTER_DETAIL_REQUEST}`)
        .its('response.body')
        .should(data => {
          expect(data[0].char_id).to.be.eq(randomCharacterId);
        });
      cy.get(`#character-detail-${randomCharacterId}`);
    });
  });

  context('to test quote component', () => {
    it('to click button if a quote exists', () => {
      cy.wait(`@${CHARACTER_QUOTE_REQUEST}`).its('response.statusCode').should('eq', 200);
      cy.get(`@${CHARACTER_QUOTE_REQUEST}`)
        .its('response.body')
        .should(data => {
          if (data.length > 0) {
            cy.get('#refresh-quote-button').click();
          }
        });
    });

    it('to show loading component', () => {
      cy.get('#item-loading');
    });

    it('to check if another quote is loaded correctly', () => {
      cy.wait(`@${CHARACTER_QUOTE_REQUEST}`).its('response.statusCode').should('eq', 200);
      cy.get(`@${CHARACTER_QUOTE_REQUEST}`)
        .its('response.body')
        .should(data => {
          if (data.length > 0) {
            expect(data[0].author).to.be.eq(mockedCharacterData.name);
          } else {
            // TODO: show that his or her quote doesn't exist
          }
        });
    });
  });
});

describe('to test invalid request', () => {
  const wrongId = 'blabla';
  beforeEach(() => {
    cy.intercept('GET', `${GET_CHARACTERS}/${wrongId}`).as(CHARACTER_DETAIL_BAD_REQUEST);
  });

  beforeEach(() => {
    cy.visit(`/${wrongId}`);
  });

  it('to show loading component', () => {
    cy.get('#page-loading');
  });

  it('receive error', () => {
    cy.wait(`@${CHARACTER_DETAIL_BAD_REQUEST}`).its('response.statusCode').should('eq', 500);
  });

  it('detect go back button', () => {
    cy.get('#go-back-button');
  });
});

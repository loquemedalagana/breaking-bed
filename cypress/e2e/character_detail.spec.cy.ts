import characterList from '../../src/tests/mocks/characterList';
import Character, { ServerCharacterData } from '../../src/models/Character';
import { GET_CHARACTERS, GET_QUOTES } from './apiURLforTest';

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
      cy.wait(`@${CHARACTER_DETAIL_REQUEST}`).then(intersection => {
        assert.isNotNull(intersection.response.body);
      });
      cy.get(`#character-detail-${randomCharacterId}`);
    });
    it('to detect button after the loading', () => {
      cy.get('#refresh-quote-button');
    });
  });

  context('to test quote component', () => {
    it('to click button', () => {
      cy.get('#refresh-quote-button').click();
    });

    it('to show loading component', () => {
      cy.get('#item-loading');
    });

    it('to check if the quote is loaded correctly', () => {
      cy.wait(`@${CHARACTER_QUOTE_REQUEST}`).then(intersection => {
        assert.isNotNull(intersection.response.body);
      });
    });
  });
});

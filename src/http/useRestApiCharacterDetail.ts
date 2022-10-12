import axios from 'axios';

import { REST_API__CHARACTERS, REST_API__RANDOM_QUOTE } from 'src/http/restApiURL';
import Character, { ServerCharacterData } from 'src/models/Character';
import Quote, { ServerQuoteData } from 'src/models/Quote';

export interface RestApiCharacterDetail {
  getCharacterDetailById: (characterId: string) => Promise<Character>;
  getRandomQuoteByCharacterName: (characterName: string) => Promise<Quote>;
}

const useRestApiCharacterDetail = (): RestApiCharacterDetail => {
  const getCharacterDetailById = async (characterId: string): Promise<Character> => {
    const response = await axios.get(`${REST_API__CHARACTERS}/${characterId}`);
    return new Character(response.data[0] as ServerCharacterData);
  };

  const getRandomQuoteByCharacterName = async (characterName: string): Promise<Quote> => {
    const enCodedCharacterName = characterName.replace(' ', '+');
    const response = await axios.get(`${REST_API__RANDOM_QUOTE}?autor=${enCodedCharacterName}`);
    return new Quote(response.data[0] as ServerQuoteData);
  };

  return {
    getCharacterDetailById,
    getRandomQuoteByCharacterName,
  };
};

export default useRestApiCharacterDetail;

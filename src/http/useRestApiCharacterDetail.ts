import axios from 'axios';

import { REST_API__CHARACTERS } from 'src/http/restApiURL';
import Character, { ServerCharacterData } from 'src/models/Character';

export interface RestApiCharacterDetail {
  getCharacterDetailById: (characterId: string) => Promise<Character>;
}

const useRestApiCharacterDetail = (): RestApiCharacterDetail => {
  const getCharacterDetailById = async (characterId: string): Promise<Character> => {
    const response = await axios.get(`${REST_API__CHARACTERS}/${characterId}`);
    return new Character(response.data[0] as ServerCharacterData);
  };

  // TODO: call random quote
  return {
    getCharacterDetailById,
  };
};

export default useRestApiCharacterDetail;

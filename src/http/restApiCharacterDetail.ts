import axios from 'axios';

import { REST_API__CHARACTERS } from 'src/http/restApiURL';
import Character, { ServerCharacterData } from 'src/models/Character';

const restApiGetCharacterDetail = async (characterId: string): Promise<Character> => {
  const response = await axios.get(`${REST_API__CHARACTERS}/${characterId}`);
  return new Character(response.data[0] as ServerCharacterData);
};

export default restApiGetCharacterDetail;

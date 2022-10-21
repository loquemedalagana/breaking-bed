import axios from 'axios';

import { CHARACTER_COUNT_PER_PAGE } from 'src/actions/characterListSaga';
import { REST_API__CHARACTERS } from 'src/http/restApiURL';
import Character, { ServerCharacterData } from 'src/models/Character';

const restApiCharacterList = async (pageNumber: number = 0): Promise<Character[]> => {
  const response = await axios.get(
    `${REST_API__CHARACTERS}?limit=${CHARACTER_COUNT_PER_PAGE}&offset=${pageNumber * CHARACTER_COUNT_PER_PAGE}`,
  );
  return response.data.map((data: any) => new Character(data as ServerCharacterData));
};

export default restApiCharacterList;

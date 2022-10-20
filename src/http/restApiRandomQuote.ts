import axios from 'axios';

import { REST_API__RANDOM_QUOTE } from 'src/http/restApiURL';
import Quote, { ServerQuoteData } from 'src/models/Quote';

const restApiGetRandomQuoteByCharacterName = async (characterName: string): Promise<Quote | null> => {
  const enCodedCharacterName = characterName.replace(' ', '+');
  const response = await axios.get(`${REST_API__RANDOM_QUOTE}?author=${enCodedCharacterName}`);
  return response.data.length > 0 ? new Quote(response.data[0] as ServerQuoteData) : null;
};

export default restApiGetRandomQuoteByCharacterName;

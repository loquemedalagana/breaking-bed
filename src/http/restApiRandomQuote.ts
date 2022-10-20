import axios from 'axios';

import { REST_API__RANDOM_QUOTE } from 'src/http/restApiURL';
import Quote, { ServerQuoteData } from 'src/models/Quote';

const restApiGetRandomQuoteByCharacterName = async (characterName: string): Promise<Quote> => {
  const enCodedCharacterName = characterName.replace(' ', '+');
  const response = await axios.get(`${REST_API__RANDOM_QUOTE}?author=${enCodedCharacterName}`);
  return new Quote(response.data[0] as ServerQuoteData);
};

export default restApiGetRandomQuoteByCharacterName;

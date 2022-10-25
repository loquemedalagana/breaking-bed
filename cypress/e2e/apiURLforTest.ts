export const CHARACTER_COUNT_PER_PAGE = 4;

export const GET_CHARACTERS = 'https://www.breakingbadapi.com/api/characters';
export const GET_QUOTES = 'https://www.breakingbadapi.com/api/quote/random?author=';

export const getCharacterListEndpointPerPage = (pageNumber: number) => {
  return `${GET_CHARACTERS}?limit=${CHARACTER_COUNT_PER_PAGE}&offset=${pageNumber * CHARACTER_COUNT_PER_PAGE}`;
};

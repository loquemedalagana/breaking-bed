import * as characterListActions from 'src/actions/characterListActions';
import { CHARACTER_COUNT_PER_PAGE } from 'src/http/restApiCharacterList';
import Character, { ServerCharacterData } from 'src/models/Character';
import { CharacterListState, initialState, characterListReducer } from 'src/stores/characterListStore';
import mockedCharacterList from 'src/tests/mocks/mockedCharacterList';

const getSampleDataList = (page: number): Character[][] => {
  const sampleList = mockedCharacterList.map((data: any) => new Character(data as ServerCharacterData));

  if (page <= 0) {
    return [
      [],
      sampleList.slice(
        page * CHARACTER_COUNT_PER_PAGE,
        page * CHARACTER_COUNT_PER_PAGE + CHARACTER_COUNT_PER_PAGE,
      ),
    ];
  }

  return [
    sampleList.slice(0, page * CHARACTER_COUNT_PER_PAGE),
    sampleList.slice(
      page * CHARACTER_COUNT_PER_PAGE,
      page * CHARACTER_COUNT_PER_PAGE + CHARACTER_COUNT_PER_PAGE,
    ),
  ];
};

describe('character list reducer test', () => {
  const samplePreviousPage = 1;
  const [prevSampleData, nextSampleData] = getSampleDataList(samplePreviousPage);

  const samplePrevState: CharacterListState = {
    page: samplePreviousPage,
    data: prevSampleData,
    loading: false,
    error: null,
    isReachedEnd: false,
  };

  it('should return the initial state', () => {
    expect(characterListReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('after the request, should return the loading state', () => {
    expect(
      characterListReducer(
        {
          ...initialState,
          page: samplePreviousPage,
          data: prevSampleData,
        },
        {
          type: characterListActions.CHARACTER_LIST_REQUEST,
        },
      ),
    ).toEqual({
      ...samplePrevState,
      loading: true,
    });
  });

  it('should return the success state', () => {
    expect(
      characterListReducer(
        {
          ...samplePrevState,
          loading: true,
        },
        {
          type: characterListActions.CHARACTER_LIST_SUCCESS,
          payload: {
            data: nextSampleData,
          },
        },
      ),
    ).toEqual({
      ...samplePrevState,
      loading: false,
      data: [...prevSampleData, ...nextSampleData],
      error: null,
      page: samplePreviousPage + 1,
    });
  });

  it('should return the error state', () => {
    expect(
      characterListReducer(samplePrevState, {
        type: characterListActions.CHARACTER_LIST_ERROR,
        payload: {
          error: new Error('error'),
        },
      }),
    ).toEqual({
      ...samplePrevState,
      loading: false,
      error: new Error('error'),
    });
  });

  it('should return the end state', () => {
    expect(
      characterListReducer(samplePrevState, {
        type: characterListActions.GET_REACHED_END,
      }),
    ).toEqual({
      ...samplePrevState,
      isReachedEnd: true,
    });
  });
});

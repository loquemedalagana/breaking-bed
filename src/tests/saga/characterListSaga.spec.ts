import { fork, select, throttle } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';

import * as characterListActions from 'src/actions/characterListActions';
import restApiCharacterList from 'src/http/restApiCharacterList';
import { CharacterListState } from 'src/stores/characterListStore';
import characterListRootSaga, { fetchCharacterList, watchFetchCharacterList } from 'src/actions/characterListSaga';
import { getSampleDataList } from 'src/tests/mocks/mockedCharacterList';

describe('unit testing for character list saga', () => {
  const samplePrevPageNumber = 0;
  const [prevSampleData, nextSampleData] = getSampleDataList(samplePrevPageNumber);

  const samplePrevState: CharacterListState = {
    page: samplePrevPageNumber,
    data: prevSampleData,
    loading: false,
    error: null,
    isReachedEnd: false,
  };

  it('to test root saga', () => {
    const rootGen = characterListRootSaga();
    expect(rootGen.next().value).toEqual(fork(watchFetchCharacterList));
  });

  it('to test watch saga', () => {
    const watchGen = watchFetchCharacterList();
    expect(watchGen.next().value).toEqual(
      throttle(3000, characterListActions.CHARACTER_LIST_REQUEST, fetchCharacterList),
    );
  });

  it('to test fetch saga success', async () => {
    return await expectSaga(fetchCharacterList)
      .withState(samplePrevState)
      .provide([
        [select((state: CharacterListState) => state), samplePrevState],
        [matchers.call.fn(restApiCharacterList), nextSampleData],
      ])
      .put({
        type: characterListActions.CHARACTER_LIST_SUCCESS,
        payload: {
          data: nextSampleData,
        },
      })
      .run();
  });

  it('to test fetch saga fail', async () => {
    return await expectSaga(fetchCharacterList)
      .withState(samplePrevState)
      .provide([
        [select((state: CharacterListState) => state), samplePrevState],
        [matchers.call.fn(restApiCharacterList), throwError(new Error('error'))],
      ])
      .put({
        type: characterListActions.CHARACTER_LIST_ERROR,
        payload: {
          error: new Error('error'),
        },
      })
      .run();
  });
});

import React, { JSXElementConstructor } from 'react';
import { renderHook, act } from '@testing-library/react';

import { CharacterDetailContext } from 'src/stores/contexts';
import useCharacterDetailStore, { CharacterDetailStore, initialState } from 'src/stores/characterDetailStore';
import mockedCharacterList from 'src/tests/mocks/mockedCharacterList';
import Character, { ServerCharacterData } from 'src/models/Character';

describe('Character Detail Store Hook', () => {
  const [RANDOM_CHARACTER_ID_MIN, RANDOM_CHARACTER_ID_MAX] = [1, 30];
  const randomCharacterId = Math.floor(Math.random() * (RANDOM_CHARACTER_ID_MAX - RANDOM_CHARACTER_ID_MIN) + 1);
  const fetchedCharacterData = mockedCharacterList.filter(data => data.char_id === randomCharacterId);
  const mockedCharacterData = new Character(fetchedCharacterData[0] as ServerCharacterData);

  const wrapper: JSXElementConstructor<{ children: React.ReactNode; value: CharacterDetailStore }> = ({
    children,
    value,
  }) => <CharacterDetailContext.Provider value={value}>{children}</CharacterDetailContext.Provider>;

  it('to fetch character detail test', async () => {
    // @ts-expect-error
    const { result } = renderHook(() => useCharacterDetailStore(), { wrapper });

    await act(async () => {
      await result.current.getCharacterDetailInfo(String(randomCharacterId));
    });
    expect(result.current.state.data?.name.replace('&amp;', '')).toBe(mockedCharacterData.name);
    console.log(result.current.state);
  });

  it('to fetch invalid character id test', async () => {
    // @ts-expect-error
    const { result } = renderHook(() => useCharacterDetailStore(), { wrapper });

    await act(async () => {
      await result.current.getCharacterDetailInfo(String(1104));
    });
    // @ts-expect-error
    // eslint-disable-next-line no-prototype-builtins
    expect(result.current.state.error.hasOwnProperty('type')).toBe(true);
    console.log(result.current.state);
  });
});

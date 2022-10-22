import React, { JSXElementConstructor } from 'react';
import { renderHook, act } from '@testing-library/react';

import { CharacterDetailContext } from 'src/stores/contexts';
import useCharacterDetailStore, { CharacterDetailStore } from 'src/stores/characterDetailStore';
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

  // @ts-expect-error
  const { result } = renderHook(() => useCharacterDetailStore(), { wrapper });

  it('to fetch character detail test', async () => {
    await act(async () => {
      await result.current.fetchCharacterDetail(String(randomCharacterId));
    });
    expect(result.current.state.data?.name.replace('&amp;', '')).toBe(mockedCharacterData.name);
  });
});

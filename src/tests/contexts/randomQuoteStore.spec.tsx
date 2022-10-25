import React, { JSXElementConstructor } from 'react';
import { renderHook, act } from '@testing-library/react';

import Quote, { ServerQuoteData } from 'src/models/Quote';
import { RandomQuoteContext } from 'src/stores/contexts';
import useRandomQuoteStore, { RandomQuoteStore } from 'src/stores/randomQuoteStore';
import mockedQuoteList, { sampleCharacterName } from 'src/tests/mocks/mockedQuoteList';

describe('Random Quote Store Hook', () => {
  const sampleMockedQuoteList = mockedQuoteList.map(quoteData => new Quote(quoteData as ServerQuoteData));
  const wrapper: JSXElementConstructor<{ value: RandomQuoteStore; children: React.ReactNode }> = ({
    children,
    value,
  }) => {
    return <RandomQuoteContext.Provider value={value}>{children}</RandomQuoteContext.Provider>;
  };

  it(`to fetch random quote of ${sampleCharacterName}`, async () => {
    // @ts-expect-error
    const { result } = renderHook(() => useRandomQuoteStore(), { wrapper });

    await act(async () => {
      await result.current.fetchCharacterRandomQuote(sampleCharacterName);
    });
    console.log(result.current.state);
    expect(
      sampleMockedQuoteList.filter(
        quoteData =>
          quoteData.quote === result.current.state.data?.quote && quoteData.author === result.current.state.data.author,
      ).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it('to request a quote of a character without quote', async () => {
    // @ts-expect-error
    const { result } = renderHook(() => useRandomQuoteStore(), { wrapper });
    await act(async () => {
      await result.current.fetchCharacterRandomQuote('Gonzo');
    });
    expect(result.current.state).toEqual({
      loading: false,
      data: null,
      error: null,
    });
  });
});

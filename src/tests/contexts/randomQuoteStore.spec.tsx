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

  // @ts-expect-error
  const { result } = renderHook(() => useRandomQuoteStore(), { wrapper });

  it(`to fetch random quote of ${sampleCharacterName}`, async () => {
    await act(async () => {
      await result.current.fetchCharacterRandomQuote(sampleCharacterName);
    });

    expect(
      sampleMockedQuoteList.filter(
        quoteData =>
          quoteData.quote === result.current.state.data?.quote && quoteData.author === result.current.state.data.author,
      ).length,
    ).toBeGreaterThanOrEqual(1);
  });
});

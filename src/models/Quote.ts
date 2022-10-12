import { immerable } from 'immer';

export interface ServerQuoteData {
  quote_id: number;
  quote: string;
  author: string;
  series: string;
}

class Quote {
  [immerable] = true;
  quoteId: number;
  quote: string;
  author: string;
  series: string;

  constructor(data: ServerQuoteData) {
    this.quoteId = data.quote_id;
    this.quote = data.quote;
    this.author = data.author;
    this.series = data.series;
  }
}

export default Quote;

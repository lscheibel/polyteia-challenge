export enum GraphTypes {
  Line = 'line',
  LineBreak = 'lineBreak',
  Candle = 'candle',
}

export const dateFormatter = new Intl.DateTimeFormat('en-DE', { day: 'numeric', month: 'short', year: '2-digit' });

export const UP_COLOR = '#418744';
export const DOWN_COLOR = '#AB4740';

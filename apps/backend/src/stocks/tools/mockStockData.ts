import { makeNoise2D } from 'open-simplex-noise';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const mockStockData = (seed: string, start: number) => {
  const noise = makeNoise2D([...seed].map(char => alphabet.indexOf(char)).reduce((c, a) => (c + 2) * a));

  // Note: `timestamp` is in seconds.
  const data: Array<{ value: number; timestamp: number }> = [];
  const dataLength = 200;

  const timestampInterval = 60 * 60; // hourly
  const frequency = 0.5;
  const amplitude = 20;

  const endDate = 1704808416; // Jan 09 2024
  let lastValue = start;
  for (let i = dataLength; i > 0; i--) {
    const nextValue = lastValue + noise(i * frequency, 0) * amplitude;
    lastValue = nextValue;
    data.push({ value: nextValue, timestamp: endDate - timestampInterval * i });
  }

  return data;
};

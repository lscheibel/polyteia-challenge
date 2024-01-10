export const dateFormatter = new Intl.DateTimeFormat('en-DE', { day: 'numeric', month: 'short', year: '2-digit' });

export const commonProps = {
  theme: { axis: { ticks: { line: { stroke: '#ddd' } } } },
  margin: { top: 5, right: 0, bottom: 50, left: 40 },
  animate: false,
};

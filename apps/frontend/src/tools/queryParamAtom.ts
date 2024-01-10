import { atom, Atom } from 'react-atomic-state';

// Note: Based on react-atomic-state, this wrapper allows us to access state in the query params in a reactive way.

export const queryParamAtom = (key: string, initialValue: string | null, replaceState = true): Atom<string | null> => {
  const setupInternalAtom = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const valueFromQueryParams = urlParams.get(key);
    return atom(valueFromQueryParams ?? initialValue);
  };

  const internalAtom = setupInternalAtom();

  const setParams = (value: string | null) => {
    const urlParams = new URLSearchParams(window.location.search);
    if (value === null) {
      urlParams.delete(key);
    } else {
      urlParams.set(key, value);
    }
    const paramsString = urlParams.toString();
    const nextLocation = window.location.pathname + (paramsString ? '?' + paramsString : '');

    if (replaceState) {
      history.replaceState(null, '', nextLocation);
    } else {
      history.pushState(null, '', nextLocation);
    }
  };

  return {
    get: internalAtom.get,
    set: (value: Parameters<Atom<string | null>['set']>[0]) => {
      const v = typeof value === 'function' ? value(internalAtom.get()) : value;
      setParams(v);
      internalAtom.set(v);
    },
    subscribe: internalAtom.subscribe,
    reset: () => {
      setParams(null);
      internalAtom.set(initialValue);
    },
  };
};

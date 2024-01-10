import { atom, Atom } from 'react-atomic-state';

// Note: This is a tiny wrapper around an even smaller library for simple atomic states in react.
//  This persists the stored value in the localStorage.

export const localStorageAtom = <T>(key: string, initialValue: T): Atom<T> => {
  const setupInternalAtom = () => {
    let value: T;
    const lsValue = localStorage.getItem(key);

    if (lsValue === null) {
      value = initialValue;
    } else {
      try {
        value = JSON.parse(lsValue);
      } catch (e) {
        value = initialValue;
      }
    }

    return atom(value);
  };

  const internalAtom = setupInternalAtom();

  return {
    get: internalAtom.get,
    set: (value: Parameters<Atom<T>['set']>[0]) => {
      // @ts-ignore Value must be JSON serializable.
      const v = typeof value === 'function' ? value(internalAtom.get()) : value;
      localStorage.setItem(key, JSON.stringify(v));
      internalAtom.set(v);
    },
    subscribe: internalAtom.subscribe,
    reset: () => {
      localStorage.removeItem(key);
      internalAtom.set(initialValue);
    },
  };
};

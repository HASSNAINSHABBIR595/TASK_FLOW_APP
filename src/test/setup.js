import "@testing-library/jest-dom";

Object.defineProperty(globalThis, "Audio", {
  writable: true,
  value: class {
    play() {
      return Promise.resolve();
    }
  },
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

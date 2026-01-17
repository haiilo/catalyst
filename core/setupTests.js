const { setupGlobal } = require('@stencil/core/mock-doc');

// Initialize mock-doc globals (window, document, etc.) before modules are loaded
setupGlobal(global);

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}));

global.MutationObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  takeRecords: jest.fn(),
  disconnect: jest.fn()
}));

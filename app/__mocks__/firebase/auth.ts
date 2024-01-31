export const signOut = jest.fn(() => Promise.resolve());

// Mock the entire auth module
export const auth = {
  signOut,
};

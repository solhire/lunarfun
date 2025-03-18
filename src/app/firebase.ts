// Mock Firebase implementation to avoid environment variable issues
console.log('Using mock Firebase implementation');

// Mock Firebase app
export const app = {
  name: '[DEFAULT]',
  options: {}
};

// Mock authentication
export const auth = {
  onAuthStateChanged: (callback: (user: null) => void) => {
    callback(null);
    return () => {};
  },
  signInWithPopup: async () => ({ user: null }),
  signOut: async () => {}
};

// Mock Firestore
export const db = {
  collection: () => ({
    doc: () => ({
      get: async () => ({
        exists: false,
        data: () => null
      }),
      set: async () => {},
      update: async () => {}
    }),
    where: () => ({
      get: async () => ({
        docs: [],
        empty: true
      })
    }),
    orderBy: () => ({
      limit: () => ({
        get: async () => ({
          docs: [],
          empty: true
        })
      })
    })
  })
};

// Initialize mock firebase
export function initializeFirebase() {
  console.log('Mock Firebase initialized successfully');
  return { app, auth, db };
} 
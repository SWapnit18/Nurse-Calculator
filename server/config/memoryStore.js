// Shared in-memory fallback store for when MongoDB Atlas is offline or in simulation mode
const memStore = {
  attempts: [],
  mistakes: [],
  bookmarks: []
};

module.exports = memStore;

/**
 * define environment specific objects
 */
module.exports = {
  // use localhost when running on simulator
  sim: {
    IP_ADDRESS: 'http://localhost:8081',
    FIREBASE_PATH: 'https://gainsville.firebaseio.com'
  },

  // device has no IP_ADDRESS by design - get from local machine
  device: {
    FIREBASE_PATH: 'https://gainsville.firebaseio.com'
  }
};

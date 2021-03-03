/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  let store = null;
  on('task', {
    test() {
      console.log('===== it works =====');
      return null;
    },
    setStore(value) {
      store = value;
      return null;
    },
    getStore() {
      return store;
    }
  })
}

const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
it("Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado", () => {
  /* Usei o mesmo principio dos testes anteriores */
  /* Chama uma função com um parâmetro: */
  saveCartItems("<ol><li>Item</li></ol>")
  /* Espera que quando essa função for chamada, ocorra um localStorage.setItem */
  expect(localStorage.setItem).toHaveBeenCalled()
})
it("Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro 'cartItems' e o segundo sendo o valor passado como argumento para saveCartItems", () => {
  saveCartItems("<ol><li>Item</li></ol>")
  expect(localStorage.setItem).toHaveBeenCalledWith("cartItems", saveCartItems())
})
});

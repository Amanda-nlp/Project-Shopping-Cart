require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
it("Teste se fetchProducts é uma função", () => {
  expect(typeof fetchProducts).toBe("function")
})
it("Execute a função fetchProducts com o argumento computador e teste se fetch foi chamada", async () => {
  await fetchProducts("computador")
  expect(fetch).toHaveBeenCalled()
})
it("Teste se, ao chamar a função fetchProducts com o argumento computador, a função fetch utiliza o endpoint https://api.mercadolibre.com/sites/MLB/search?q=computador", async () => {
  await fetchProducts("computador")
  const endpoint = "https://api.mercadolibre.com/sites/MLB/search?q=computador"
  expect(fetch).toHaveBeenCalledWith(endpoint)
})
it("Teste se o retorno da função fetchProducts com o argumento computador é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.", () => {
  /* await fetchProducts("computador") */
  /* Referência usada: https://jestjs.io/pt-BR/docs/asynchronous */
  expect(fetchProducts("computador")).resolves.toEqual(computadorSearch)
})
it("Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url. Dica: Lembre-se de usar o new Error('mensagem esperada aqui') para comparar com o objeto retornado da API.", async () => {
  /* Exercício baseado na aula do dia 23/03/2022 */
  try {
    await fetchProducts()
  } catch (error) {
    expect(error).toEqual(new Error("You must provide an url"))
  }
})
});

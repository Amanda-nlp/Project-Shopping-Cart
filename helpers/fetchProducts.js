const fetchProducts = async (computador) => {
const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${computador}`;
const declarandoFetch = await fetch(endpoint);
const dadosApi = await declarandoFetch.json();
const { results } = dadosApi;
return results;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
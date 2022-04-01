const fetchItem = async (id) => {
const endpoint = `https://api.mercadolibre.com/items/${id}`;
const declarandoFetch = await fetch(endpoint);
const dadosApi = await declarandoFetch.json();
return dadosApi;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}

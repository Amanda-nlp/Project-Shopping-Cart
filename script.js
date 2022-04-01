const carrinho = document.querySelector('.cart__items');
let contador = 0;

function mostrarTotalSempre() {
  const price = document.createElement('div');
  price.className = 'total-price';
  const container = document.querySelector('.container');
  container.appendChild(price);
}

function totalPrice(preco) {
  contador += preco;
  /* Referência usada = https://stackoverflow.com/questions/5786851/define-a-global-variable-in-a-javascript-function */
/* Maneira que achei para o Lint não dar erro declarando mais de 3 vezes a mesma variável, tornando-a uma variável global */
  window.chamandoDivCriada = document.querySelector('.total-price');
  chamandoDivCriada.innerText = `${contador}`; /* `SUBTOTAL: R${contador}` */
}

function limparTudo() {
  carrinho.innerHTML = '';
  chamandoDivCriada.innerText = '';
  contador = 0;
}

function botaoLimparTudo() {
  const botaoLimpar = document.querySelector('.empty-cart');
  botaoLimpar.addEventListener('click', limparTudo);
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  /* Referência usada = https://www.w3schools.com/jsref/met_element_queryselector.asp */
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  /* Remover os itens do carrinho */
  event.target.remove();
  /* Chamando função para excluir os itens salvos do localstorage */
  saveCartItems(carrinho.innerText);

  if (contador > 0) {
    const pegandoPrice = event.target.innerText.split('PRICE: $');
    contador -= pegandoPrice[1];
    window.chamandoDivCriada = document.querySelector('.total-price');
    chamandoDivCriada.innerText = `${contador}`;
  }
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function getCartElement(item) {
  /* Referência usada = https://www.w3schools.com/jsref/met_element_queryselector.asp */
  const pegandoId = getSkuFromProductItem(item.target.parentNode);
  const chamaFuncao = await fetchItem(pegandoId);
  /* Desconstrução dos valores necessários: ID, descrição e preço de cada produto */
  const { id: sku, title: name, price: salePrice } = chamaFuncao;
  const product = { 
    sku, 
    name,
    salePrice,
  };
  const elemento = createCartItemElement(product);
  /* "ol" vai receber como filho o objeto de produtos criado acima */
  carrinho.appendChild(elemento);
  /* Chamando função para salvar os itens no localstorage colocados no carrinho */
  saveCartItems(carrinho.innerHTML);
  totalPrice(salePrice);
}

function saveCarrinho() {
  carrinho.innerHTML = getSavedCartItems();
  const li = document.querySelectorAll('.cart__item');
  li.forEach((index) => index.addEventListener('click', cartItemClickListener));
}

function addEventToCart() {
  /* Selecionando a classe do botão "Adicionar ao carrinho" */
  const pegandoClasseBotao = document.querySelectorAll('.item__add');
  /* Percorrendo todos os elementos presentes e adicionando um evento em cada um */
  pegandoClasseBotao.forEach((index) => {
    index.addEventListener('click', getCartElement);
  });
}

function mensagemCarregando() {
const aparecerNoContainer = document.querySelector('.container');
const criandoElemento = document.createElement('span');
criandoElemento.className = 'loading';
criandoElemento.innerHTML = 'carregando...';
aparecerNoContainer.appendChild(criandoElemento);
}

function excluirMensagemCarregando() {
const criandoElemento = document.querySelector('.loading');
criandoElemento.remove();
}

async function getComputer() {
  mensagemCarregando();
  /* Chamando a função assíncrona */
  const chamandoFuncao = await fetchProducts('computador');
  excluirMensagemCarregando();
  /* Percorrendo todos os elementos presentes com o comando "forEach" */
  chamandoFuncao.forEach(({ id, title, thumbnail }) => {
    /* Desconstrução dos elementos necessários, como: ID, descrição e imagem */
    const newProducts = { sku: id, name: title, image: thumbnail };
    /* Salvando os dados declarados acima na função "createProductItemElement" */
    const products = createProductItemElement(newProducts);
    /* Selecionando a classe "items" e declarando ela como pai */
    document.querySelector('.items').appendChild(products);
  }); 
  addEventToCart();
}

window.onload = () => {
  getComputer();
  addEventToCart();
  saveCarrinho(); 
  mostrarTotalSempre();
  botaoLimparTudo();
};

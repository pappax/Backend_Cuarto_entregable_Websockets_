const socket = io();
socket.on('connect', () => {
  console.log('Conectado al servidor de WebSocket');

  // Enviar solicitud para obtener la lista actualizada de productos
  socket.emit('getProducts');
});

socket.on('updateProducts', (products) => {
  console.log('Lista de productos actualizada', products);

  // Actualizar la lista de productos en la vista
  const productList = document.querySelector('.product-list');
  let productListHTML = '';
  products.forEach((product) => {
    productListHTML += `<li>${product.name} - ${product.price}</li>`;
  });
  productList.innerHTML = `<ul>${productListHTML}</ul>`;
});


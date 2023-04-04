const socket = io();
        socket.on('connect', () => {
            console.log('Conectado al servidor de WebSocket');
        });

        socket.on('updateProducts', (products) => {
            console.log('Lista de productos actualizada', products);

            // Actualizar la lista de productos en la vista
            const productList = document.querySelector('.product-list');
            let productListHTML = '';
            products.forEach((product) => {
                productListHTML += `<li>${product.id}: ${product.name} - ${product.price}</li>`;
            });
            productList.innerHTML = productListHTML;
        });

        // Agregar producto
        const addProductForm = document.getElementById('add-product-form');
        addProductForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const price = document.getElementById('price').value;
            const id = generateUUID(); // or use a simple incrementing integer
            const product = { id, name, price };
            socket.emit('addProduct', product);
            addProductForm.reset();
        });

        // Eliminar producto
        const removeProductForm = document.getElementById('remove-product-form');
        removeProductForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const id = document.getElementById('id').value;
            socket.emit('removeProduct', id);
            removeProductForm.reset();
        });

        // Genera el ID
        function generateUUID() {
            let d = new Date().getTime();
            if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
                d += performance.now(); // use high-precision timer if available
            }
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        }
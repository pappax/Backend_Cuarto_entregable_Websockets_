import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewRouter from './routes/views.router.js';

import {Server} from 'socket.io';

const app = express();
const PORT = 9090;

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Uso de vista de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views");
app.set('view engine', 'handlebars');

//Carpeta public
app.use(express.static(__dirname+'/public'));

const httpServer = app.listen(PORT, () => {
    console.log("Servidor escuchando por el puerto: " + PORT);
});

// Declaramos el router
app.use('/', viewRouter);

let products = [];

// Configurar WebSocket
const io = new Server(httpServer);


// Configurar eventos de WebSocket
io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado');

    // Enviar lista de productos disponibles al cliente
    socket.emit('updateProducts', products);

    // Escuchar eventos del cliente para agregar y eliminar productos
    socket.on('addProduct', (product) => {
        products.push(product);
        console.log(product); 
        io.emit('updateProducts', products); // Actualizar lista de productos para todos los clientes
    });

    socket.on('removeProduct', (productId) => {
        products = products.filter(product => product.id !== productId);
        io.emit('updateProducts', products); // Actualizar lista de productos para todos los clientes
    });

    // Cerrar conexión del cliente
    socket.on('disconnect', () => {
        console.log('Usuario desconectado'); 
    });
});

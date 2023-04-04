import express from 'express';
const router = express.Router();

// Define una ruta para la ruta raíz '/' que renderiza una plantilla de vista llamada 'home'
router.get('/', (req, res) => {
  res.render('home',{});
});

// Define una ruta para la ruta '/realTimeProducts' que renderiza una plantilla de vista llamada 'realTimeProducts'
router.get('/realTimeProducts', (req, res) => {
  res.render('realTimeProducts');
});

export default router;
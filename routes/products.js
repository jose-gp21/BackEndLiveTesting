const router = require('express').Router();
const productController = require('../controllers/productsControllers');

router.get('/', productController.getAllProduct);
router.get('/:id', productController.getProduct);
router.get('/search/:key', productController.searchProduct);
router.post('/', productController.createProduct); // Alterado de GET para POST

module.exports = router;
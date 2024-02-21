const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const {verifyToken} = require('../middleware/verifyToken')


router.post('/:id', cartController.addToCart);

router.get('/find/:id', cartController.getCart);

// Atualizar a quantidade de um item no carrinho
router.put('/update/:cartId', cartController.updateCartItem);

// Reduzir a quantidade de um item no carrinho
router.put('/decrement/quantity', cartController.decrementCartItem);

// Remover um item do carrinho
router.delete('/remove/:cartId', cartController.deleteCartItem);

// Remover todos os itens do carrinho (limpar o carrinho)
router.delete('/clear/:cartId', cartController.clearCart);

module.exports = router;
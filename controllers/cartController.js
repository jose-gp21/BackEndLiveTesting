const Product = require('../models/Products');
const Cart = require('../models/Cart');7

module.exports = {

    addToCart: async (req, res) => {
        const userId = req.user.id
        const { cartItem, quantity } = req.body;

        try {
            const cart = await Cart.findOne({ userId });
            if (cart) {
                const existingProduct = cart.products.find(
                    (product) => product.cartItem.toString() === cartItem
                );
            
                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    cart.products.push({ cartItem, quantity });
                }
            
                await cart.save();
                res.status(200).json("Product added to cart");
            } else {
                const newCart = new Cart({
                    userId,
                    products: [{ cartItem, quantity: quantity }]
                });
            
                await newCart.save();
                res.status(200).json("Product added to cart");
            }
            
            
        } catch (error) {
            res.status(500).json({ message: 'An error occurred', error });
        }
    },
    getCart: async (req, res) => {
        const userId = req.params.id;
    
        try {
            const cart = await Cart.findOne({ userId }).populate('products.cartItem', "_id tit'tle supplier price imageUrl");
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    decrementCartItem: async (req, res) => {
        const { userId, cartItem } = req.body;
    
        try {
            const cart = await Cart.findOne({ userId });
    
            if (!cart) {
                return res.status(404).json("Cart not found");
            }
    
            const existingProduct = cart.products.find(
                (product) => product.cartItem.toString() === cartItem
            );
    
            if (!existingProduct) {
                return res.status(404).json("Product not found");
            }
    
            if (existingProduct.quantity === 1) {
                cart.products = cart.products.filter(
                    (product) => product.cartItem.toString() !== cartItem
                );
            } else {
                existingProduct.quantity -= 1;
            }
    
            await cart.save();
    
            if (existingProduct.quantity === 0) {
                await Cart.updateOne(
                    { userId },
                    { $pull: { products: { cartItem } } }
                );
            }
    
            res.status(200).json("Product updated");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteCartItem: async (req, res) => {
        const { userId, cartItem } = req.body;
    
        try {
            const cart = await Cart.findOne({userId});
    
            if (!cart) {
                return res.status(404).json("Cart not found");
            }
    
            // Verifica se o produto existe no carrinho
            const itemIndex = cart.products.findIndex(
                (item) => item.cartItem.toString() === cartItem
            );
    
            if (itemIndex > -1) {
                // Remove o item do array de produtos
                cart.products.splice(itemIndex, 1);
                await cart.save();
                res.status(200).json("Product removed from cart");
            } else {
                // Se o produto não estiver no carrinho, retorna um erro
                res.status(404).json("Product not found in cart");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateCartItem: async (req, res) => {
        const { cartId, cartItem, quantity } = req.body;
    
        try {
            // Encontrar o carrinho do usuário pelo ID do carrinho
            const cart = await Cart.findOne(cartId);
    
            if (!cart) {
                return res.status(404).json("Cart not found");
            }
    
            // Encontrar o produto específico no array de produtos do carrinho
            const productIndex = cart.products.findIndex(
                (item) => item.cartItem.toString() === cartItem
            );
    
            if (productIndex !== -1) {
                // Produto encontrado, atualizar a quantidade
                cart.products[productIndex].quantity = quantity;
    
                await cart.save();
                res.status(200).json("Cart item updated successfully");
            } else {
                // Produto não encontrado no carrinho
                res.status(404).json("Cart item not found");
            }
        } catch (error) {
            // Erro ao atualizar o item do carrinho
            res.status(500).json({ message: 'Error updating cart item', error });
        }
    },
    
    clearCart: async (req, res) => {
        const cartId = req.params.cartId;
    
        try {
            const cart = await Cart.findOne(cartId);
    
            if (!cart) {
                return res.status(404).json("Cart not found");
            }
    
            // Limpa o array de produtos
            cart.products = [];
    
            await cart.save();
            res.status(200).json("Cart cleared successfully");
        } catch (error) {
            res.status(500).json({ message: 'Error clearing cart', error });
        }
    },
    
    
    
    
    

};

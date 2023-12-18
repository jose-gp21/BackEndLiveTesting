const { json } = require('express');
const Product = require('../models/Products');

module.exports = {
    createProduct: async (req, res) => {
        const newProduct = new Product(req.body);
        try {
            await newProduct.save();
            res.status(201).json({ message: 'Produto criado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Falha ao criar o produto.' });
        }
    },
    getAllProduct: async (req, res) => {
        try {
            const products = await Product.find().sort({ createdAt: -1 });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Falha ao buscar os produtos.' });
        }
    },

    getProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Falha ao buscar o produto.' });
        }
    },
    searchProduct: async (req, res) => {
        try {
            const result = await Product.aggregate(
                [
                    {
                        $search: {
                            index: "default",
                            text: {
                                query: req.params.key,
                                path: {
                                    wildcard: "*"
                                }
                            }
                        }
                    }
                ]
            );
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Falha ao buscar os produtos.' });
        }
    }
};

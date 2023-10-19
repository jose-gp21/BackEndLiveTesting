const { json } = require('express');
const Product = require('../models/Products');

module.exports = {
    createProduct: async (req, res) => {
        const newProduct = new Product(req.body);
        try {
            await newProduct.save();
            res.status(200).json('Produto criado!'); // Corrigir a string da resposta JSON
        } catch (error) {
            res.status(500).json('Produto falhou!'); // Corrigir a string da resposta JSON
        }
    },
    getAllProduct: async (req, res) => {
        try {
            const products = await Product.find().sort({ createdAt: -1 });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json('Os produtos falharam');
        }
    },

    getProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json('Produto falhou em ser pego!'); // Corrigir a string da resposta JSON
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
            res.status(200).json(result); // Corrigir a variável de resposta para 'result'
        } catch (error) {
            res.status(500).json('Produtos falharam em serem pegados!');
        }
    }
};

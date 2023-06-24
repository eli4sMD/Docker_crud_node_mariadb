console.log('Product controller');

const productModel = require('../models/product.models');
ctrlProducts = {};

ctrlProducts.getActiveProducts = async (req, res) => {

    try {
        const products = await productModel.getAllProducts();
        console.log(products);
        if(products.length === 0) {
            return res.status(404).json({
                message: "There's no active products for this user"
            }).end();
        }

        return res.json({
            message: `### 🌟👇Quantity of active products: # ${products.length} ###`,
            products
        }).end();
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
    

};


ctrlProducts.createProduct = async (req, res) => {
    
    const { nombre, precio } = req.body;

    if (!nombre || !precio) {
        res.status(400).json({ error: 'Se requiere nombre y precio del producto' });
    } else {
        try {
            const resultado = await productModel.insertProduct(nombre, precio);
            res.json(resultado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

};

ctrlProducts.updateProduct = async (req, res) => {

    const id = req.params.id;
    const { nombre, precio } = req.body;

    if (!nombre || !precio) {
        res.status(400).json({ error: 'Se requiere nombre y precio del producto' });
    } else if (!id) {
        res.status(400).json({ error: 'Se requiere el ID del producto' });
    } else {
        try {
            const resultado = await productModel.updateProduct(id, nombre, precio);
            res.json(resultado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};


ctrlProducts.deleteProduct = async (req, res) => {

    const id = req.params.id;

    if(!id) {
        return res.status(400).json({
            message : 'No product id in the request'
        });
    }

    try {
        const resultado = await productModel.deleteProduct(id);
        res.json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }

};


module.exports = ctrlProducts;

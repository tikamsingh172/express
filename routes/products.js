const router = require('express').Router();
let products = require('../productsData');

router.get('/products', (req, res) => {
    const productsCount = products.length;
    res.json({
        success: true,
        productsCount,
        products
    });
});


router.get('/products/:productId', (req, res) => {
    const id = req.params.productId;
    const product = products.find((product) => product.id === id);
    res.json({
        success: true,
        product
    });
});


router.put('/products/:productId', (req, res) => {
    console.log(req.params, req.body)
    const id = req.params.productId;
    const { name, price } = req.body;
    const product = products.map((product) => (
        product.id !== id ? product : name && price ? { ...product, name, price } : name ? { ...product, name } : price && { ...product, price }
    ));
    res.json({
        success: true,
        product
    });
});


router.post('/products', (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
        throw new Error('All fields are required.');
        return res.status(422).json({
            success: false,
            error: 'All fields are required.'
        });
    }

    const product = {
        id: new Date().getTime().toString(),
        name,
        price
    }

    products.push(product);

    res.json({
        success: true,
        product
    })
});


router.delete('/products/:productId', (req, res) => {
    const id = req.params.productId;
    products = products.filter((product) => product.id !== id);
    res.json({ success: true });
});


module.exports = router;
import { products } from '../mock-data/products.data.js';

const getProductsHandler = async (req, res) => {
    try {
        let response = {
        message: "success",
        data: {
            products: products,
            count: products.length
        }
        };
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
    };

const getProductHandlerByParam = async (req, res) => {
    try {
        const id = req.params.id;
        const product = products.find(p => p.id === id);
        let response = {};
        if (!product) {
        response = { message: "Producto no encontrado" };
        return res.status(404).json(response);
        }
        response = { message: "success", data: product };
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

const postProductHandler = async (req, res) => {
    try {
        const newProduct = req.body;
        const product = products.find(p => p.id === newProduct.id);
        let response = {};
        if (product) {
        response = { message: "Producto ya existe" };
        return res.status(409).json(response);
        }
        if (!newProduct.name || newProduct.name === "") {
        response = { message: "Se requiere el nombre del producto" };
        return res.status(400).json(response);
        }
        products.push(newProduct);
        response = { message: "success", data: { productId: newProduct.id } };
        return res.status(201).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

const putProductHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedProduct = req.body;
        const index = products.findIndex(p => p.id === id);
        let response = {};
        if (index === -1) {
        response = { message: "Producto no encontrado" };
        return res.status(404).json(response);
        }
        products[index] = { ...products[index], ...updatedProduct };
        response = { message: "success", data: products[index] };
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

const deleteProductHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const index = products.findIndex(p => p.id === id);
        let response = {};
        if (index === -1) {
        response = { message: "Producto no encontrado" };
        return res.status(404).json(response);
        }
        products.splice(index, 1);
        response = { message: "success" };
        return res.status(204).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export {
    getProductsHandler,
    getProductHandlerByParam,
    postProductHandler,
    putProductHandler,
    deleteProductHandler
};
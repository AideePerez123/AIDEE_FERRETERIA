import { orders } from '../mock-data/orders.data.js';

const getOrdersHandler = async (req, res) => {
    try {
        let response = {
        message: "success",
        data: {
            orders: orders,
            count: orders.length
        }
        };
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

const getOrderHandlerByParam = async (req, res) => {
    try {
        const id = req.params.id;
        const order = orders.find(o => o.id === id);
        let response = {};
        if (!order) {
        response = { message: "Orden no encontrada" };
        return res.status(404).json(response);
        }
        response = { message: "success", data: order };
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

const postOrderHandler = async (req, res) => {
    try {
        const newOrder = req.body;
        const order = orders.find(o => o.id === newOrder.id);
        let response = {};
        if (order) {
        response = { message: "Orden ya existe" };
        return res.status(409).json(response);
        }
        if (!newOrder.customerId || !newOrder.products) {
        response = { message: "Se requieren customerId y productos" };
        return res.status(400).json(response);
        }
        orders.push(newOrder);
        response = { message: "success", data: { orderId: newOrder.id } };
        return res.status(201).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

const putOrderHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedOrder = req.body;
        const index = orders.findIndex(o => o.id === id);
        let response = {};
        if (index === -1) {
        response = { message: "Orden no encontrada" };
        return res.status(404).json(response);
        }
        orders[index] = { ...orders[index], ...updatedOrder };
        response = { message: "success", data: orders[index] };
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
    };

const deleteOrderHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const index = orders.findIndex(o => o.id === id);
        let response = {};
        if (index === -1) {
        response = { message: "Orden no encontrada" };
        return res.status(404).json(response);
        }
        orders.splice(index, 1);
        response = { message: "success" };
        return res.status(204).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
    };

export {
    getOrdersHandler,
    getOrderHandlerByParam,
    postOrderHandler,
    putOrderHandler,
    deleteOrderHandler
};
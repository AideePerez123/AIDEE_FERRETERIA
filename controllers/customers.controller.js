import { customers } from '../mock-data/customers.data.js';

const getCustomersHandler = async (req, res) => {
    try {
        let response = {
        message: "success",
        data: {
            customers: customers,
            count: customers.length
        }
        };
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

const getCustomerHandlerByParam = async (req, res) => {
    try {
        const id = req.params.id;
        const customer = customers.find(c => c.id === id);
        let response = {};
        if (!customer) {
        response = { message: "Cliente no encontrado" };
        return res.status(404).json(response);
        }
        response = { message: "success", data: customer };
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

const postCustomerHandler = async (req, res) => {
    try {
        const newCustomer = req.body;
        const customer = customers.find(c => c.id === newCustomer.id);
        let response = {};
        if (customer) {
        response = { message: "Cliente ya existe" };
        return res.status(409).json(response);
        }
        if (!newCustomer.name || newCustomer.name === "") {
        response = { message: "Se requiere el nombre del cliente" };
        return res.status(400).json(response);
        }
        customers.push(newCustomer);
        response = { message: "success", data: { customerId: newCustomer.id } };
        return res.status(201).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno de servidor" });
    }
};

const putCustomerHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedCustomer = req.body;
        const index = customers.findIndex(c => c.id === id);
        let response = {};
        if (index === -1) {
        response = { message: "Cliente no encontrado" };
        return res.status(404).json(response);
        }
        customers[index] = { ...customers[index], ...updatedCustomer };
        response = { message: "success", data: customers[index] };
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

const deleteCustomerHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const index = customers.findIndex(c => c.id === id);
        let response = {};
        if (index === -1) {
        response = { message: "Cliente no encontrado" };
        return res.status(404).json(response);
        }
        customers.splice(index, 1);
        response = { message: "success" };
        return res.status(204).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
    };

export {
    getCustomersHandler,
    getCustomerHandlerByParam,
    postCustomerHandler,
    putCustomerHandler,
    deleteCustomerHandler
    };
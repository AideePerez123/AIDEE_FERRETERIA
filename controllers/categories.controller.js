import { categories } from '../mock-data/categories.data.js';
import service from '../services/categories.service.js';

const getCategoriesHandler = async (req, res) => {
    try {
        let response = {
        message: "success",
        data: {
            categories: categories,
            count: categories.length
        }
        };
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
    };

const getCategoryHandlerByParam = async (req, res) => {
    try {
        const id = req.params.id;
        const category = service.findCategoryById(id, categories);
        let response = {};
        if (!category) {
        response = { message: "Categoría no encontrada" };
        return res.status(404).json(response);
        }
        response = { message: "success", data: category };
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

const postCategoryHandler = async (req, res) => {
    try {
        const newCategory = req.body;
        let response = {};
        if (!service.validateCategory(newCategory)) {
        response = { message: "Datos de categoría inválidos" };
        return res.status(400).json(response);
        }
        const existingCategory = service.findCategoryById(newCategory.id, categories);
        if (existingCategory) {
        response = { message: "Categoría ya existe" };
        return res.status(409).json(response);
        }
        categories.push(newCategory);
        response = { message: "success", data: { categoryId: newCategory.id } };
        return res.status(201).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

const putCategoryHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedCategory = req.body;
        let response = {};
        if (!service.validateCategory({ id, ...updatedCategory })) {
        response = { message: "Datos de categoría inválidos" };
        return res.status(400).json(response);
        }
        const index = categories.findIndex(c => c.id === id);
        if (index === -1) {
        response = { message: "Categoría no encontrada" };
        return res.status(404).json(response);
        }
        categories[index] = { ...categories[index], ...updatedCategory };
        response = { message: "success", data: categories[index] };
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
    };

const deleteCategoryHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const index = categories.findIndex(c => c.id === id);
        let response = {};
        if (index === -1) {
        response = { message: "Categoría no encontrada" };
        return res.status(404).json(response);
        }
        categories.splice(index, 1);
        response = { message: "success" };
        return res.status(204).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export {
    getCategoriesHandler,
    getCategoryHandlerByParam,
    postCategoryHandler,
    putCategoryHandler,
    deleteCategoryHandler
    };
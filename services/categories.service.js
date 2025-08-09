// categories.service.js
// Lógica de negocio para categorías

/**
 * Valida que una categoría tenga los campos requeridos
 * @param {Object} category - Objeto con los datos de la categoría
 * @returns {boolean} - True si es válida, false si no
 */
const validateCategory = (category) => {
    if (!category || typeof category !== 'object') return false;
    if (!category.id || typeof category.id !== 'string') return false;
    if (!category.name || typeof category.name !== 'string' || category.name.trim() === '') return false;
    if (category.description && typeof category.description !== 'string') return false;
    return true;
};

/**
 * Verifica si una categoría existe por ID
 * @param {string} id - ID de la categoría
 * @param {Array} categories - Lista de categorías
 * @returns {Object|null} - Categoría encontrada o null
 */
const findCategoryById = (id, categories) => {
        return categories.find(c => c.id === id) || null;
};

export default {
    validateCategory,
    findCategoryById
    };
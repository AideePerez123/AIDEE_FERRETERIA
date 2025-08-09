import { products } from '../mock-data/products.data.js';

class ProductService {
    getAll() { return products; }
    getById(id) { return products.find(p => p.id === id); }
    create(data) { products.push(data); return data; }
    update(id, data) {
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) products[index] = { ...products[index], ...data };
        return index !== -1 ? products[index] : null;
    }
    delete(id) {
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) products.splice(index, 1);
        return index !== -1;
    }
    }

export default new ProductService();
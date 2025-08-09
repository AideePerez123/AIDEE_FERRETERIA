import { orders } from '../mock-data/orders.data.js';

class OrderService {
    getAll() { return orders; }
    getById(id) { return orders.find(o => o.id === id); }
    create(data) { orders.push(data); return data; }
    update(id, data) {
        const index = orders.findIndex(o => o.id === id);
        if (index !== -1) orders[index] = { ...orders[index], ...data };
        return index !== -1 ? orders[index] : null;
    }
    delete(id) {
        const index = orders.findIndex(o => o.id === id);
        if (index !== -1) orders.splice(index, 1);
        return index !== -1;
    }
    }

export default new OrderService();
import { customers } from '../mock-data/customers.data.js';

class CustomerService {
    getAll() { return customers; }
    getById(id) { return customers.find(c => c.id === id); }
    create(data) { customers.push(data); return data; }
    update(id, data) {
        const index = customers.findIndex(c => c.id === id);
        if (index !== -1) customers[index] = { ...customers[index], ...data };
        return index !== -1 ? customers[index] : null;
    }
    delete(id) {
        const index = customers.findIndex(c => c.id === id);
        if (index !== -1) customers.splice(index, 1);
        return index !== -1;
    }
}

export default new CustomerService();
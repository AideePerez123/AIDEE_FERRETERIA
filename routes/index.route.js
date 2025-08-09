import { Router } from 'express';
import customersRoute from './customers.route.js';
import ordersRoute from './orders.route.js';
import productsRoute from './products.route.js';
import categoriesRoute  from './categories.route.js';
const router = Router();

router.use('/customers', customersRoute);
router.use('/orders', ordersRoute);
router.use('/products', productsRoute);
router.use('/categories', categoriesRoute);

export default router;
import { Router } from 'express';
import {
    getOrdersHandler,
    getOrderHandlerByParam,
    postOrderHandler,
    putOrderHandler,
    deleteOrderHandler
} from '../controllers/orders.controller.js';

const router = Router();

router.get('/', getOrdersHandler);
router.get('/:id', getOrderHandlerByParam);
router.post('/', postOrderHandler);
router.put('/:id', putOrderHandler);
router.delete('/:id', deleteOrderHandler);

export default router;
const express = require('express');
const { getOrders, createOrder, updateOrder, deleteOrder } = require('../controllers/ordersController');

const router = express.Router();

router.get('/', getOrders);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
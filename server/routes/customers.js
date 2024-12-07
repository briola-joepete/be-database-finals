const express = require('express');
const { getCustomers, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customersController');

const router = express.Router();

router.get('/', getCustomers);
router.post('/', createCustomer);
router.put('/:id', updateCustomer); // Add this line for updating a customer
router.delete('/:id', deleteCustomer); // Add this line for deleting a customer

module.exports = router;

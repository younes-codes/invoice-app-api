const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoice');

router.post('/create-invoice/:userId', invoiceController.createInvoice);
router.post('/confirmed-invoice', invoiceController.confirmedInvoice);
router.post('/paid-invoice', invoiceController.confirmedInvoicePaid);
router.get('/get-invoices/:userId', invoiceController.getInvoices);
router.get('/get-invoice/:invoiceId', invoiceController.getInvoiceById);
router.delete('/delete-invoice/:invoiceId', invoiceController.deleteInvoice);


module.exports = router;


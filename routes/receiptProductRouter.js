const Router =  require('express').Router
const ReceiptProductController = require('../controllers/receiptProductController')
const router = new Router()

router.post('/', ReceiptProductController.createReceiptProduct)
router.get('/', ReceiptProductController.getReceiptProducts)
router.get('/:id', ReceiptProductController.getOneReceiptProduct)
router.put('/', ReceiptProductController.updateReceiptProduct)
router.delete('/', ReceiptProductController.deleteReceiptProduct)

module.exports = router
const Router =  require('express').Router
const ReceiptController = require('../controllers/receiptController')
const router = new Router()


router.post('/', ReceiptController.createReceipt)
router.get('/', ReceiptController.getReceipts)
router.get('/open', ReceiptController.getOpenReceipt)
router.get('/:id', ReceiptController.getOneReceipt)
router.put('/', ReceiptController.updateReceipt)
router.delete('/', ReceiptController.deleteReceipt)

module.exports = router
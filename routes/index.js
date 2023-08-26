const Router =  require('express').Router
const router = new Router()

const productRouter = require('./productRouter')
const receiptRouter = require('./receiptRouter')
const receiptProductRouter = require('./receiptProductRouter')


router.use('/product', productRouter)
router.use('/receipt', receiptRouter)
router.use('/receiptProduct', receiptProductRouter)

module.exports = router;

const Router =  require('express').Router
const ProductController = require('../controllers/productController')
const router = new Router()

router.post('/', ProductController.createProduct)
router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getOneProduct)
router.put('/', ProductController.updateProduct)
router.delete('/', ProductController.deleteProduct)

module.exports = router
const postgres = require('../db')
const { Product } = require('../models/models')


class ProductController {

    async createProduct(req,res){
        try {
            const { title, price } = req.body
            const newProduct = await Product.create({title, price})

            res.json(newProduct)
        } catch (error) {
            res.json(error?.original.detail)
        }
    }

    async getProducts(req, res){
        try {
            let products = await Product.findAll()

            if(products.length === 0) {//if database empty
                const newProducts =[]
                for await (const item of defaultProducts) {
                    const newProduct = await Product.create({
                        title: item.title, 
                        price:item.price
                    })
                    newProducts.push(newProduct)
                }
                return res.json(newProducts)
            }

            res.json(products)
        } catch (error) {
            res.json(error)
        } 
    }

    async getOneProduct(req, res){
        try {
            const id = req.params.id
            const product =  await Product.findOne({ where: {id} })

            res.json(product)
        } catch (error) {
            res.json(error?.original.detail)
        }
    }

    async updateProduct(req,res){
        try {
            const { id, title, price } = req.body

            const result = await Product.update(
                { title, price },
                { where : { id } }
            )
                
            result.length 
                ?res.send(`updated ${result.length} products`)
                :res.send(`item not found`)

        } catch (error) {
            res.json(error?.original.detail)
        } 
    }

    async deleteProduct(req,res){
        try {
            const { id } = req.body

            const result = await Product.destroy({ where: {id} })
            result.length 
                ?res.send(`deleted ${result.length} products`)
                :res.send(`item not found`)
        } catch (error) {
            res.json(error?.original.detail)
        }
    }

}

module.exports = new ProductController()

//hardcoded products if database is empty
const defaultProducts = [
    {
        title:'green',
        price:'10'
    },
    {
        title:'blue',
        price:'2'
    },
    {
        title:'red',
        price:'185'
    },
    {
        title:'purple',
        price:'33.5'
    },
    {
        title:'orange',
        price:'17.3'
    },
    {
        title:'dark',
        price:'13'
    },
    {
        title:'yellow',
        price:'1123.55'
    },
    {
        title:'sky',
        price:'99'
    },
    {
        title:'ruby',
        price:'17'
    },
    {
        title:'pink',
        price:'55'
    },
    
]
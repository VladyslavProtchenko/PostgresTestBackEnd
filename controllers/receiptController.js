const postgres = require('../db')
const { Receipt, Product } = require('../models/models')
const { ReceiptProduct } = require('../models/models')

class ReceiptController {

    async createReceipt(req,res){
        try {
            const { total, isClosed, date } = req.body
            const newReceipt = await Receipt.create({ isClosed, number, date, total })

            res.json(newReceipt)
        } catch (error) {
            res.json(error?.original.detail)
        }
    }

    async getReceipts(req, res){
        try {
            const receipts = await Receipt.findAll({
                order: [['id', 'DESC']]
            })
            const results = []
            
            for await (const receipt of receipts) {
                const products = await ReceiptProduct.findAll({
                    where: { receiptId: receipt.id },
                    include: {
                        model: Product,
                        attributes: ['title'],
                    }, 
                })
                results.push({...receipt, products:products})
            }

            res.json(results)
        } catch (error) {
            res.json(error)
        } 
    }

    async getOneReceipt(req, res){
        try {
            const id = req.params.id

            const products = await ReceiptProduct.findAll({ where: { receiptId: id }})
            const total = products.reduce((acc, cur)=> acc + cur.dataValues.price,0)

            const receipt = await Receipt.findOne({
                where: { id } 
            })

            const response = {
                ...receipt.dataValues,
                total,
                products,
            }

            res.json(response)
 
        } catch (error) {
            res.json(error)
        }
        
    }

    async getOpenReceipt(req, res){
        try {
            
            const receipt = await Receipt.findOne({
                where: { isClosed: false } 
            })

            const products = await ReceiptProduct.findAll({ where: { receiptId: receipt.dataValues.id }})
            const total = products.reduce((acc, cur)=> acc + cur.dataValues.price,0)
            const response = {
                ...receipt.dataValues,
                total,
                products,
            }

            res.json(receipt)
 
        } catch (error) {
            res.json(error)
        }
        
    }

    async updateReceipt(req,res){
        try {
            const { id, total } = req.body
            const date = new Date().toLocaleString();
            const result = await Receipt.update(
                { isClosed: true, total, date },
                { where : { id } }
            )
            const products = await ReceiptProducts.findAll(
                { where : { receiptingId: id } }
            )

            result.length 
                ?res.send(`updated ${result.length} receipts`,products)
                :res.send(`item not found`)

        } catch (error) {
            res.json(error)
        }
        
    }

    async deleteReceipt(req,res){
        try {
            const { id } = req.body
            console.log('workk', id)
            const result = await Receipt.destroy({ where: {id} })
            result.length 
                ?res.send(`deleted ${result.length} receipts`)
                :res.send(`item not found`)

        } catch (error) {
            res.json(error)
        }

    }

}

module.exports = new ReceiptController()
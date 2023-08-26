const postgres = require('../db')
const { ReceiptProduct, Product, Receipt } = require('../models/models')

class ReceiptProductController {

    async createReceiptProduct(req,res){
        try {
            const { isFirst, receiptId, productId, price } = req.body
            let newReceiptId;
            if(isFirst) {//is first product in receipt 
                const isReceipt = await Receipt.findOne({ where: { isClosed: false }})
                if(isReceipt) return res.json(isReceipt)

                const highestValueItem = await Receipt.findOne({
                    order: [['number', 'DESC']],
                })//looking up for higest number and increace it + 1)Its a bad, but I didnt found how to do better
                const number = highestValueItem 
                                    ?  highestValueItem.dataValues.number + 1
                                    : 1

                const receipt = await Receipt.create({
                    isClosed: false,
                    number
                })
                newReceiptId = receipt.dataValues.id
            }
            const newReceiptProduct = await ReceiptProduct.create({
                receiptId: receiptId? receiptId: newReceiptId, 
                productId,
                price
            })
            res.json(newReceiptProduct)
        } catch (error) {
            res.json(error)
        }
    }

    async getReceiptProducts(req, res){
        try {
            const {id} = req.query

            const receiptProducts = await ReceiptProduct.findAll({
                where: { receiptId: id },
                include: {
                    model: Product,
                    attributes: ['title'],
                }, 
            })
            res.json(receiptProducts)

        } catch (error) {
            console.log('inside catch block')
            res.json(error)
        } 
    }

    async getOneReceiptProduct(req, res){
        try {
            const id = req.params.id

            const receiptProduct = await await ReceiptProduct.findOne(
                {where: { id }},
                {include: {
                    model: Product,
                    attributes: ['title'],
                }}
            )
            res.json(receiptProduct)

        } catch (error) {
            res.json(error?.original.detail)
        }
    }

    async updateReceiptProduct(req,res){
        try {
            const item  = req.body

            const result = await ReceiptProduct.update(
                { 
                    quantity:item.quantity, 
                    price:item.price 
                },
                { where : { id: item.id } }
            )
            result.length 
                ?res.send(`updated ${result.length} products`)
                :res.send(`item not found`)

        } catch (error) {
            res.json(error)
        }
        
    }

    async deleteReceiptProduct(req,res){
        try {
            const { id } = req.body

            const result = await ReceiptProduct.destroy({ where: {id} })
            
            result.length 
                ?res.send(`deleted ${result.length} products`)
                :res.send(`item not found`)

        } catch (error) {
            res.json(error)
        }

    }

}
module.exports = new ReceiptProductController()
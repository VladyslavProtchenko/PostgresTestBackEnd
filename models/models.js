const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Product = sequelize.define('product', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING, 
        unique: true,
    },
    price: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
},{ timestamps: false  })

const Receipt = sequelize.define('receipt', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    isClosed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    number: {
        type: DataTypes.INTEGER,
        unique:true,
        defaultValue: 0
    },    
    date: {  
        type: DataTypes.STRING,
        defaultValue: 'today'
    },
    total: { 
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
},{ timestamps: false  })

const ReceiptProduct = sequelize.define('receiptproduct',{
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    quantity: {  
        type: DataTypes.INTEGER, 
        defaultValue: 1
    },

    price: { 
        type: DataTypes.FLOAT,  
        defaultValue: 0 
    },
},{ timestamps: false  })


Receipt.hasMany(ReceiptProduct)
ReceiptProduct.belongsTo(Receipt)

Product.hasOne(ReceiptProduct)
ReceiptProduct.belongsTo(Product)


module.exports = {  Product, Receipt, ReceiptProduct }
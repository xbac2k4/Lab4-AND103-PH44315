const mongoose = require('mongoose');

// khai báo sản phẩm
const ProductSchema = mongoose.Schema({
    hinhanh: {
        type: String,
        required: true,
    },
    ten: {
        type: String,
        required: true,
    },
});

const Products = mongoose.model('product', ProductSchema);

module.exports = Products;
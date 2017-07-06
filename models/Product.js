const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ProductSchema = new Schema({
  name       : String,
  price      : {type:Number, required:true},
  imageUrl   : String,
  description: String,
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;

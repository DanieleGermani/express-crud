var express = require('express');
var Product = require('../models/Product');
var router = express.Router();

// CRUD => R: Retrieve All
router.get('/', function(req, res, next) {
  Product.find({}, (err, p) => {
    res.render('product', {
      title: 'Express Marc',
      products: p
    });
  });
});

// CRUD => R: Retrieve - Product detail
router.get('/:id', function(req, res, next) {
  console.log(`Se ha llamado con el parametro ${req.params.id}`);
  console.log(req.params);
  console.log(req.query);
  Product.findById(req.params.id, (err, p) => {
    if(err){
      console.log(err);
    }
    res.render('productDetail', {
      title: 'Express Marc',
      product: p
    });
  });
});

// CRUD => U: Update a product
router.post('/:id/update', function(req, res, next) {
  let {name, price, description, priceUrl} = req.body;
  let updates = {
    name,
    price,
    description,
    priceUrl
  };
  console.log(updates);
  Product.findByIdAndUpdate(req.params.id, updates, (err, p) => {
    if(err){
      console.log(err);
    }
    res.redirect(`/product/${p._id}`);
  });
});

// CRUD => D: Delete a product
router.get('/:id/delete', function(req, res, next) {
  let id = req.params.id;
  Product.findByIdAndRemove(id, (err, obj) => {
    if (err){ return next(err); }
    res.redirect("/product");
  });
});


// CRUD => C: Create
router.post('/', function(req, res, next) {
  console.log(req.body);
  let p = new Product({
    name: req.body.name,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    description: req.body.description
  });
  p.save((err, obj) => {
    res.redirect('/product');
  });
});


module.exports = router;

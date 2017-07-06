const Product = require('./Product');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/product-example-development2')
  .then(() => {
    let productos = [
      {
        name: 'Cocacola',
        price: 0.65,
        imageUrl: "http://cocacola.es",
        description:'Una cocacola de Bali'
      },
      {
        name: 'Zapatillas Nike',
        price: 40.0,
        imageUrl: "http://nike.es",
        description:'Unas zapatillas to flama'
      },
      {
        name: 'Macbook Pro',
        price: 2100.0,
        imageUrl: "http://apple.com",
        description:'Un portatil mac'
      },
    ];

    let productObj = productos.map( p => new Product(p));

    productObj.forEach( p => p.save( (err, obj) =>{
      if(err){
        console.log(err);
      }else{
        console.log(`New product created [${obj.name}] with ID:${obj._id}`);
      }
    }));

    //mongoose.connection.close();
  });

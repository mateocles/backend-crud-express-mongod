const itemRoutes = require('express').Router();

var Item = require('../models/Item');

// Defined store route
itemRoutes.route('/add').post((req, res, next) => {
    var item = new Item(req.body);
    item.save()
    .then(item => {
      res.status(200).json({'item': 'Item agregado exitosamente'});
    })
    .catch(err => {
      res.status(400).send("no se puede guardar en la base de datos");
    });
  });

// Defined get data(index or listing) route
itemRoutes.route('/').get(function (req, res) {
  Item.find(function (err, items){
    if(err){
      console.log(err);
    }
    else {
      res.json(items);
    }
  });
});

// Defined edit route
itemRoutes.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Item.findById(id, function (err, item){
      res.json(item);
  });
});

//  Defined update route
itemRoutes.route('/update/:id').post(function (req, res) {
  Item.findById(req.params.id, function(err, item) {
    if (!item)
      return next(new Error('No se pudo cargar el documento'));
    else {
      item.name = req.body.name;
      item.price = req.body.price;

      item.save().then(item => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("incapaz de actualizar la base de datos");
      });
    }
  });
});

// Defined delete | remove | destroy route
itemRoutes.route('/delete/:id').get(function (req, res) {
  Item.findByIdAndRemove({_id: req.params.id}, function(err, item){
        if(err) res.json(err);
        else res.json('Eliminado exitosamente');
    });
});

module.exports = itemRoutes;

const pokemonRoutes = require('express').Router();

var Pokemon = require('../models/pokemon');

// Defined store route
pokemonRoutes.route('/add').post((req, res, next) => {
    var pokemon = new Pokemon(req.body);
    console.log(pokemon)
    pokemon.save()
    .then(pokemon => {
      res.status(200).json({'pokemon': 'Pokemon agregado exitosamente'});
    })
    .catch(err => {
      res.status(400).send("no se puede guardar en la base de datos");
    });
  });

// Defined get data(index or listing) route
pokemonRoutes.route('/').get(function (req, res) {
  Pokemon.find(function (err, pokemons){
    if(err){
      console.log(err);
    }
    else {
      res.json(pokemons);
    }
  });
});

// Defined edit route
pokemonRoutes.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Pokemon.findById(id, function (err, pokemon){
      res.json(pokemon);
  });
});

//  Defined update route
pokemonRoutes.route('/update/:id').post(function (req, res) {
  Pokemon.findById(req.params.id, function(err, pokemon) {
    if (!pokemon)
      return next(new Error('No se pudo cargar el pokemon'));
    else {
      pokemon.name = req.body.name;
      pokemon.power = req.body.power;

      pokemon.save().then(pokemon => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("incapaz de actualizar la base de datos");
      });
    }
  });
});

// Defined delete | remove | destroy route
pokemonRoutes.route('/delete/:id').get(function (req, res) {
  Pokemon.findByIdAndRemove({_id: req.params.id}, function(err, pokemon){
        if(err) res.json(err);
        else res.json('Eliminado exitosamente');
    });
});

module.exports = pokemonRoutes;

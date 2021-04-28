var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pokemon = new Schema({
  name: { type: String },
  power: { type: Number }
},{
    collection: 'pokemons'
});

module.exports = mongoose.model('Pokemon', Pokemon);

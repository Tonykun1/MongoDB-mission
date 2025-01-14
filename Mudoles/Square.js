const mongoose = require('mongoose');

const SquareSchema = new mongoose.Schema({
Length: { type: Number, required: true },
Color: { type: String, required: true },
isFilled:{type: Boolean},
text:{type:String },
textColor:{type:String}
});

module.exports = mongoose.model('Square', SquareSchema);
const mongoose = require('mongoose');


const GlassesSchema = new mongoose.Schema({
Color: { type: String, required: true },
Price: { type: Number, required: true },
IsFragile:{type: Boolean},
Material:{type:Number },
Volume:{type:Number}
});

module.exports = mongoose.model('Glasses', GlassesSchema);
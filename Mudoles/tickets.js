const mongoose = require('mongoose');

const TicketsSchema = new mongoose.Schema({
Name: { type: String, required: true },
Subject: { type: String, required: true},
Description:{type: String, required: true},
isOpen:{type:Boolean },
VolumewaitingHours:{type:Number, required: true}
});

module.exports = mongoose.model('Tickets', TicketsSchema);
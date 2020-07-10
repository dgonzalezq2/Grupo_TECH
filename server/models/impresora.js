//const Impresora = require("../routes/impresora");
const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let impresoraSchema = new Schema({
    marca: {
        type: String,
        required: [true, "La marca de la impresora es necesario"],
    },
    modelo: {
        type: String,
        required: [true, "La modelo de la impresora es necesario"],
    },
    serie: {
        type: Number,
        required: [true, "La modelo de la impresora es necesario"],
        unique: true
    },
    color: {
        type: Boolean,
        default: false,
    },
    ip: {
        type: String,
        required: [true, "La IP de la impresora es necesario"],
    },
    contador: {
        type: Number,
        get: (v) => Math.round(v),
        set: (v) => Math.round(v),
        default: 0,
    },
    precio: {
        type: Number,
        required: [true, "El precio de la impresora es necesario"],
    },
});

impresoraSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('impresora', impresoraSchema);
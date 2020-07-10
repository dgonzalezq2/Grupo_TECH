require('./config/config');
const express = require("express");
const mongoose = require('mongoose');
const app = express();
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//inclusión de rutas/impresora

app.use(require('./routes/impresora'))


//Conectar con MongoDB
mongoose.connect("mongodb://localhost:27017/prueba", {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        (err, res) => {
            if (err) throw err;
            console.log("Base de datos ONLINE");
        }) //Conectar con MongoDB

app.listen(process.env.PORT, () => {
    console.log("Escuchando en el puerto: ", process.env.PORT);
});
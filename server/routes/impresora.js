const express = require('express');
const _ = require('underscore')
const app = express();
const Impresora = require('../models/impresora')

app.get('/impresora', (req, res) => {
    res.json("get Impresora")
})

app.post('/impresora', (req, res) => { //Para crear recursos dentro del servidor
    let body = req.body

    let impresora = new Impresora({ //Creando un objeto
        marca: body.marca,
        modelo: body.modelo,
        serie: body.serie,
        color: body.color,
        ip: body.ip,
        contador: body.contador,
        precio: body.precio
    });

    impresora.save((err, impresoraDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            impresora: impresoraDB
        })
    });
})

app.put('/impresora/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ["modelo", "color", "ip", "precio"]);
    Impresora.findByIdAndUpdate(
        id,
        body, { new: true, runValidators: true },
        (err, impresoraDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                impresora: impresoraDB,
            });
        }
    );
});

app.delete("/impresora", function(req, res) {
    r
    es.json("delete Usuario");

})

app.delete('/impresora', (req, res) => {
    res.json("delete Impresora")
})



module.exports = app;
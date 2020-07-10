const express = require('express');
const _ = require('underscore')
const app = express();
const Impresora = require('../models/impresora')

app.get('/impresora', (req, res) => {
    Impresora.find({}, "marca modelo serie color ip precio").exec((err, impresora) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        if (!impresora) {
            return res.status(500).json({
                ok: false,
                error: {
                    message: 'No se encontraron impresoras.',
                },
            });
        }

        res.json({
            ok: true,
            impresora,
        });
    });
})

app.get('/impresora/:id', (req, res) => {
    const id = req.params.id;
    Impresora.findOne({ _id: id }, "marca modelo serie color ip precio", (err, impresora) => {
        if (err)
            return res.status(400).json({
                ok: false,
                err
            });

        if (!impresora) {
            return res.status(500).json({
                ok: false,
                error: {
                    message: 'No se encontro impresora.',
                },
            });
        }

        // data.contador = undefined;

        return res.json({
            ok: true,
            impresora,
        });
    });

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

app.delete("/impresora/:id", function(req, res) {
    let id = req.params.id;
    Impresora.findByIdAndRemove(id, (err, impresora) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.json({
            ok: true,
            impresora,
        });
    });
});


module.exports = app;
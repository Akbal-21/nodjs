const express = require('express')
const routes = express.Router()
const mysqlConnection = require('../databse')


routes.post('/', (req, res) => {
    const idUsuario = req.body.idUsuario;
    mysqlConnection.query(' call bxzuzr9pbguoz9y1mcxm.carroProducto( ? );',[idUsuario], (err, rows) => {
        

        if (!err) {
            //console.log(rows)
            //console.log(idUsuario);
            res.send(rows);
        } else {
            res.send(err)
        }
    })
});


routes.post('/carroAdd/', (req, res) => {

    const query = `
            CALL bxzuzr9pbguoz9y1mcxm.carroAdd(?, ?, ?);
        `
    const idUsuario = req.body.idUsuario
    const idProducto = req.body.idProducto
    const cantidad = req.body.cantidad

    mysqlConnection.query(query, [idUsuario, idProducto, cantidad], (err, result) => {
        if (!err) {
            res.send('Producto Agregado al Carrito!');
        } else {
            res.send(err)
        }
    })
});

routes.post('/carroAddAnother/', (req, res) => {

    const query = `
            CALL bxzuzr9pbguoz9y1mcxm.carroAddAnother(?, ?, ?);
        `
    const idUsuario = req.body.idUsuario
    const idProducto = req.body.idProducto
    const cantidad = req.body.cantidad

    mysqlConnection.query(query, [idUsuario, idProducto, cantidad], (err, result) => {
        if (!err) {
            res.send('Producto Agregado al Carrito!');
        } else {
            res.send(err)
        }
    })
});

routes.post('/carroDeleteProd/', (req, res) => {

    const query = `
            CALL bxzuzr9pbguoz9y1mcxm.carroDeleteProd(?, ?);
        `
    const idUsuario = req.body.idUsuario
    const idProducto = req.body.idProducto

    mysqlConnection.query(query, [idUsuario, idProducto], (err, result) => {
        if (!err) {
            res.send('Producto eliminado del Carrito!');
        } else {
            res.send(err)
        }
    })
});

routes.post('/carroLimpiar/', (req, res) => {

    const query = `
            CALL bxzuzr9pbguoz9y1mcxm.carroLimpiar(?);
        `
    const idUsuario = req.body.idUsuario
    mysqlConnection.query(query, [idUsuario], (err, result) => {
        if (!err) {
            res.send('Todos los Productos han sido eliminados del Carrito!');
        } else {
            res.send(err)
        }
    })
});

routes.post('/count/', (req, res) => {
    const idUsuario = req.body.idUsuario;
    const idProducto = req.body.idProducto;
    mysqlConnection.query(' SELECT cantidad FROM carrito WHERE idUsuario = ? and idProducto = ?;',[idUsuario,idProducto], (err, rows) => {
        

        if (!err) {
            //console.log(rows)
            //console.log(idUsuario);
            res.send(rows);
        } else {
            res.send(err)
        }
    })
});
routes.post('/buy/', (req, res) => {

    const query = `
            CALL bxzuzr9pbguoz9y1mcxm.generarPedido(?,?);
        `
    const idUsuario = req.body.idUsuario;
    const total = req.body.total;
    mysqlConnection.query(query, [idUsuario,total], (err, result) => {
        if (!err) {
            res.send('Pedido generado');
        } else {
            res.send(err);
        }
    })
});
module.exports = routes;

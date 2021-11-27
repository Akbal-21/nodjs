const express = require('express')
const routes = express.Router()
const mysqlConnection = require('../databse')

routes.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM producto', (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            res.send(err)
        }
    })
})

routes.post('/', (req, res) => {
    mysqlConnection.query('INSERT INTO producto set ?', [req.body], (err, result) => {
        if (!err) {
            res.send('Registro completo!');
        } else {
            res.send(err)
        }
    })
})

routes.post('/search/', (req, res) => {
    const search = req.body.search
    const query = `
        CALL bxzuzr9pbguoz9y1mcxm.buscarProductos (?)
    `
    mysqlConnection.query(query, [search], (err, rows) => {
        if (!err) {
            res.send(rows[0])
        } else {
            res.send(err)
        }
    })
})

routes.delete('/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM producto WHERE id = ?', [req.params.id], (err, result) => {
        if (!err) {
            res.send('Producto borrado!')
        } else {
            res.send(err)
        }
    })
})

routes.put('/:id', (req, res) => {
    mysqlConnection.query('UPDATE producto set ? WHERE id = ?', [req.body, req.params.id], (err, result) => {
        if (!err) {
            res.send('Producto actualizado!')
        } else {
            res.send(err)
        }
    })
})

module.exports = routes
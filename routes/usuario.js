const express = require('express')
const routes = express.Router()
const mysqlConnection = require('../databse')


routes.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM usuario', (err, rows, field) => {
        if (!err) {
            res.json(rows)
        } else {
            res.send(err)
        }
    })
})

routes.post('/user1/', (req, res) => {

    const correo = req.body.correo
    const pws = req.body.pws
    const query = `
        CALL bxzuzr9pbguoz9y1mcxm.roll (?, ?)
    `

    mysqlConnection.query(query, [correo, pws], (err, rows) => {
        if (!err) {
            res.send(rows[0])
        } else {
            res.send(err)
        }
    })
})

routes.post('/', (req, res) => {

    const query = `
            CALL bxzuzr9pbguoz9y1mcxm.registrarUsusario(?, ?, ?, ?, ?, ?);
        `
    const Nombre = req.body.Nombre
    const ApMat = req.body.ApMat
    const ApPat = req.body.ApPat
    const correo = req.body.correo
    const psw = req.body.psw
    const roll = req.body.roll

    mysqlConnection.query(query, [Nombre, ApMat, ApPat, correo, psw, roll], (err, result) => {
        if (!err) {
            res.send('Registro completo!');
        } else {
            res.send(err)
        }
    })
})

routes.delete('/:id/', (req, res) => {
    const id = req.params.id
    mysqlConnection.query('DELETE FROM usuario WHERE id = ?', [id], (err, rows, field) => {
        if (!err) {
            res.send('Usuario borrado!')
        } else {
            res.send(err)
        }

    })
})

routes.put('/:id', (req, res) => {
    mysqlConnection.query('UPDATE usuario set ? WHERE id = ?', [req.body, req.params.id], (err) => {
        if (!err) {
            res.send('Usuario updated!')
        } else {
            res.send(err)
        }
    })
})

module.exports = routes
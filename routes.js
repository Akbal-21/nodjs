const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('SELECT * FROM producto', (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('INSERT INTO producto set ?', [req.body], (err, rows) => {
            if (err) return res.send(err)

            res.send('Registro completo!');
        })
    })
})

routes.delete('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('DELETE FROM producto WHERE id = ?', [req.params.id], (err, rows) => {
            if (err) return res.send(err)

            res.send('Producto borrado!')
        })
    })
})

routes.put('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('UPDATE producto set ? WHERE id = ?', [req.body, req.params.id], (err, rows) => {
            if (err) return res.send(err)

            res.send('book updated!')
        })
    })
})


// usuario

routes.get('/user/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('SELECT * FROM usuario', (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/user1/', (req, res) => {
    const query = `
        call bxzuzr9pbguoz9y1mcxm.roll (?, ?);
    `
    const correo = req.body.correo
    const pws = req.body.pws
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query(query, [correo, pws], (err, rows, result) => {
            if (err) {
                return res.send({ err: err })
            }
            if (result) {
                res.send(rows)
            } else {
                res.send({ message: "usuario noencontrado / contrasena erronea" })
            }
        })
    })
})

routes.post('/user/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        const query = `
            CALL bxzuzr9pbguoz9y1mcxm.registrarUsusario(?, ?, ?, ?, ?, ?);
        `
        const Nombre = req.body.Nombre
        const ApMat = req.body.ApMat
        const ApPat = req.body.ApPat
        const correo = req.body.correo
        const psw = req.body.psw
        const roll = req.body.psw

        conn.query(query, [Nombre, ApMat, ApPat, correo, psw, roll], (err, result) => {
            if (err) return res.send(err)

            res.send('Registro completo!');
        })
    })
})

routes.delete('/user/:id/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('DELETE FROM usuario WHERE id = ?', [req.params.id], (err) => {
            if (err) return res.send(err)

            res.send('Producto borrado!')
        })
    })
})

routes.put('/user/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('UPDATE usuario set ? WHERE id = ?', [req.body, req.params.id], (err) => {
            if (err) return res.send(err)

            res.send('book updated!')
        })
    })
})



module.exports = routes
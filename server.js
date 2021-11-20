const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')
const routes = require('./routes')
const cors = require('cors')

const app = express()
app.set('port', process.env.PORT || 9000)

const dboptions={
    host: 'bxzuzr9pbguoz9y1mcxm-mysql.services.clever-cloud.com',  //lovsl host
    port: 3306,   //
    user: 'ulhsrappbpyyzgb6',   ///root
    password: 'C8agc3as8UGT7WrqG3TO',   //la que tu le asignas
    database:'bxzuzr9pbguoz9y1mcxm'     //nombre de la base
}

//midelware-----------
app.use(myconn(mysql, dboptions, 'single'))
app.use(express.json())
app.use(cors())

//routes-----------
app.get('/', (req, res, next) => {
    res.send('Welcome to my API!');
})

app.use('/api', routes)

//Server runing --------------------------------
app.listen(app.get('port'), ()=>{
    console.log('server running on port', app.get('port'))
})
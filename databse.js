const mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
    host: 'bxzuzr9pbguoz9y1mcxm-mysql.services.clever-cloud.com',  //lovsl host
    port: 3306,   //
    user: 'ulhsrappbpyyzgb6',   ///root
    password: 'C8agc3as8UGT7WrqG3TO',   //la que tu le asignas
    database: 'bxzuzr9pbguoz9y1mcxm'     //nombre de la base
})

mysqlConnection.connect(function(err){
    if (err){
        console.log(err)
        return
    }else{
        console.log('DB is connected')
    }
});

module.exports= mysqlConnection;
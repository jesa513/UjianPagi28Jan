var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var mysql = require('mysql');
var port = 1997;

var db = mysql.createConnection({
    host: 'localhost',
    user: 'jesa',
    password: 'jesa123',
    database: 'moviebertasbih',
    port: 3306
})

app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res) => {
    res.send('<h1>Ini Home Page')
})

app.get('/movielist',(req,res) => {
    var nama = req.query.nama;
    if(nama == undefined) {
        nama = '';
    }
    var sql = `select * from movies where nama like '%${nama}%';`; //baru dibuat variabel
    db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send(result)
    })
})


app.post('/addmovie', (req,res) => {
    var newMovie = {
        nama: req.body.nama,
        tahun: req.body.tahun,
        description: req.body.description
    }
    
    var sql = 'insert into movies set ? ;' 
    db.query(sql, newMovie, (err, result) => {
        
            if(err) throw err;
            console.log(result);
            res.send(result)
        // })

    })
    })



    app.put('/editmovie/:id', (req,res) => {
      
        var newEditMovie = {
            nama: req.body.nama,
            tahun: req.body.tahun,
            description: req.body.description
        }
        var sql =`update movies set ? where id=${req.params.id}`
        db.query(sql, newEditMovie, (err,res1) => {
            res.send(res1)
        })
    })


    app.delete('/deletemovie/:id', (req,res) => {
        console.log(req.params.id);
        var sql = `delete from movies where id = ${req.params.id}`;
        db.query(sql, (err, res1) => {
            if(err) throw err;
            res.send('Delete Success!')
        })
       
    })


    app.get('/categorylist',(req,res) => {
        var nama = req.query.nama;
        if(nama == undefined) {
            nama = '';
        }
        var sql = `select * from categories where nama like '%${nama}%';`; 
        db.query(sql, (err,result) => {
            if(err) throw err;
            console.log(result);
            res.send(result)
        })
    })


    app.post('/addcategory', (req,res) => {
        var newCategory = {
            nama: req.body.nama
        }
        
        var sql = 'insert into categories set ? ;' 
        db.query(sql, newCategory, (err, result) => {
            
                if(err) throw err;
                console.log(result);
                res.send(result)
    
        })
        })


        app.put('/editcategory/:id', (req,res) => {
      
            var newEditCategory = {
                nama: req.body.nama
            }
            var sql =`update categories set ? where id=${req.params.id}`
            db.query(sql, newEditCategory, (err,res1) => {
                res.send(res1)
            })
        })


        app.delete('/deletecategory/:id', (req,res) => {
            console.log(req.params.id);
            var sql = `delete from categories where id = ${req.params.id}`;
            db.query(sql, (err, res1) => {
                if(err) throw err;
                res.send('Delete Success!')
            })
           
        })
        

        app.get('/connectionlist/:nama', (req,res) => {
            var namaCat = req.params.nama;
            var sql = `select m.nama as namaMovie,
            c.nama as namaCategory
             from movies m 
             join movcat mc 
             on m.id = mc.idmovie 
             join categories c 
            on c.id = mc.idcategory
            where c.nama = '${namaCat}';`;
            db.query(sql, (err, results) => {
                if(err) throw err;
        
                res.send(results)
            })
        })

app.listen(port, () => console.log('API jalan di port ' +port));
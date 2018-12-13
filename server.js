var bodyParser = require('body-parser');
var express = require('express');
var uuid = require('uuid');
var app = express();
var mongoClient = require('mongodb').MongoClient;

var db;
var artists = [
    {
        id:1,
        name:'Noize MC'
    },
    {
        id:2,
        name:'Linkin Park'
    },
    {
        id:3,
        name:'Queen'
    },
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get ('/', function(req, res){
    res.send('Hello API');
})

app.get('/artists', function(req, res){
    db.collection('artists')
        .find()
        .toArray(function(err, docs){
            if (err){
                console.log(err);
                return res.sendStatus(500);
            }
            res.send(docs);
        })
})

app.get('/artists/:id', function(req, res){
    var artist = artists.find(function(value){
        return value.id === Number(req.params.id);
    })
    res.send(artist);
})

app.post('/artists', function(req, res){
    var artist = {
        name:req.body.name
    };
    db.collection('artists').insert(artist, function(err,result){
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(artist);
    })
})

app.put('/artists/:id',function(req, res){
    var artist = artists.find(function(value){
        return value.id === Number(req.params.id);
    });
    artist.name = req.body.name;
    res.sendStatus(200);

})

app.delete('/artists/:id',function(req, res){
    artists = artists.filter(function(value){
        return value.id !== Number(req.params.id);
    });
    res.sendStatus(200);
})



mongoClient.connect('mongodb://mongo:27017/docker-node-mongo-express-tut', function(err, database){
    if (err) throw err;
    db = database;
    app.listen(3000, function(){
        console.log('API app started');
    })

})
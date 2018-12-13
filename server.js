var bodyParser = require('body-parser');
var express = require ('express');
var app = express();
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
    res.send(artists)
    console.log('Artists were sent')
})

app.get('/artists/:id', function(req, res){
    console.log(req.params);
    var artist = artists.find(function(value){
//        console.log((typeof value.id) + value.id);
        return value.id === Number(req.params.id);
    })
    res.send(artist);
})

app.post('/artists', function(req, res){
    //var artist = 
    console.log(req.body);
    res.send('Some post data');
})

app.listen(3012, function(){
    console.log('API app started');
})


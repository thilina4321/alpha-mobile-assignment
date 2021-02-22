const app = require("express")();
const cors = require('cors');
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

app.use(cors());

var port = process.env.PORT || 9000;

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE,{              // connect the database
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true 
}).then(()=>{
    console.log('connect to the database');
}).catch('not connect');

app.use(bodyParser.urlencoded({ extended: true}));

app.use(bodyParser.json());
//create the registation routes

var v1 = require('./api/routes');

app.use('/api/v1', v1.router);

app.use(function (req, res) {
    res.status(404).send({url: req.originalUrl + 'not found!'});
});


app.listen(port, () => {
    console.log(`API server started on: ${port}`);
});
var express = require('express')
var dotenv = require('dotenv')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
// import all your routes !!
import configvars from './config/config'
var adminRoutes = require('./routes/admins.route')
dotenv.config()

const app = express()

// Cross Origin Resources Sharing, Initially all whitelisted
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

//Connexion à la base de données
mongoose.connect(configvars.devDatabaseUrl,
	{ useNewUrlParser: true,
	  useUnifiedTopology: true })
	.then(() => console.log('Successful connection to MongoDB !'))
	.catch(() => console.log('Connection to MongoDB failed !'));


app.get('/', (req, res) => {
    res.send('<h1>Welcome to Web Service REST API</h1>')
    
  })

app.use('/api/admins',adminRoutes);


module.exports = app;
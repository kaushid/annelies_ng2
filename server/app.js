const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;
const app = express();

const userRoutes = require('./routes/users');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/users',userRoutes);
//setting static folder 
app.use(express.static(path.join(__dirname,'../client')));

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
 });

app.listen(port, () => {
    console.log('Listening to port :' + port);
});
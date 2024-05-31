
//import
const express = require('express');

const ManageEmployee = require('./routes/ManageEmployee');
const Register = require('./routes/Register');
const Receipt = require('./routes/Receipt');
const SelectItem = require('./routes/SelectItem');

const logger = require('./middleware/logger');

// return object of app have many method
const app = express();

//Middleware at index.js
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//route
app.use('/api_gcp', ManageEmployee, SelectItem, Register, Receipt);

//Custom middleware
app.use(logger);


//create server with port and implement callback
app.listen(3000, () => {
    console.log('Listening to port 3000');
});


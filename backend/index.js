const express =  require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

const expressApp = express();


dotenv.config();

port = process.env.PORT || 3000;

const product = require('./src/routes/product.routes');

expressApp.use(express.json());

expressApp.use(cors());
expressApp.use(morgan('dev'));


expressApp.get('/', (req, res) => {
    return res.status(200).send('Hola');
})

expressApp.use(product);


expressApp.use(express.static('public'));

expressApp.listen(port, () => {
    console.log(`Server running and listening on port: ${port}. Go to: http://localhost:${port}/`);
});
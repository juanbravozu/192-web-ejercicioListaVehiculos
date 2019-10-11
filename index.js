const express = require('express');

var bodyParser = require('body-parser');

const app = express();

const port = 5000;

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));

var vehicles = [];

app.get('/', (request, response) => {
    response.sendFile(__dirname+'/public/home.html');
});

app.get('/api/vehicle', (request, response) => {
    response.send(vehicles);
    console.log('Vehiculos enviados');
});

app.post('/api/vehicle', (request, response) => {
    console.log(request.body);
    vehicles.push(request.body);
    response.send({
        message: 'ok',
    });
});

app.delete('/api/vehicle', (request, response) => {
    console.log(request.body);
});

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});
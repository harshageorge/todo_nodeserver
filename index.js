const express = require('express')
const cors = require('cors')
const dataService = require('./services/dataservice');
const db = require('./services/db');

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))

app.get("/gettodos", async (request, response) => {
    try {
        var result = await db.Todos.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post('/addtodo', (req, res) => {
    dataService.addtodo(req.body.order, req.body.title)
        .then(result => { res.status(result.statusCode).json(result) })

})


app.get('/gettodo/:id', (req, res) => {
    dataService.gettodo(req.params.id)
        .then(result => { res.status(result.statusCode).json(result) })

})


app.patch('/edittodo', (req, res) => {
    dataService.edittodo(req.body.order, req.body.title)
        .then(result => { res.status(result.statusCode).json(result) })

})

app.delete('/deletetodo/:id', (req, res) => {
    dataService.deletetodo(req.params.id)
        .then(result => { res.status(result.statusCode).json(result) })

})


app.listen(9000, () => { console.log("Server started at port 9000") })
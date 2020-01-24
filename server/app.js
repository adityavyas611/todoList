const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Todo = require('./dbConfig');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    Todo.find({}, (err, data) => {
        res.send({ data });
    });
});

app.post('/add', (req, res) => {
    const { data } = req.body;
    const todo = new Todo();
    todo.title = data;
    todo.save((err, result) => {
        if (!err) {
            res.send({ error: false, message: "Todo List Added!" });
        } else {
            res.send({ error: true });
        }
    });
});

app.put('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    Todo.findOneAndUpdate({ _id: id }, { title: data }, (err, val) => {
        if (!err) {
            res.send({ error: false, message: 'Todo Updated!' });
        } else {
            res.send({ error: true });
        }
    });
});

app.delete('/delete/:id', (req, res) => {

    const { id } = req.params;
    Todo.findByIdAndRemove(id, (err, result) => {
        if (!err) {
            res.send({ error: false, message: 'Item Deleted Successfully!' });
        } else {
            res.send({ error: true });
        }
    });
});

app.listen(5000, () => {
    console.log('Server Started and Listening on 5000');
});
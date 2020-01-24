const mongoose = require('mongoose');

mongoose.connect('mongodb://cybertron611:Abcd%401234@ds227808.mlab.com:27808/todos', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;


const todoSchema = new mongoose.Schema({
    title: String
});

db.on('error', () => {
    console.error('Connection Failed!')
});

db.once('open', () => {
    console.log('DB Connected!');
});

module.exports = mongoose.model('Todo', todoSchema);

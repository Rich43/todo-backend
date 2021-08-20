import initialData from './initialData.json';
import express from 'express';
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const app = express();
const port = 3000;

class Todo extends Model {}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    (async () => {
        await sequelize.sync();
        // noinspection ES6MissingAwait
        console.log(initialData);
        for (const row of initialData) {
            await Todo.create(row);
        }

        const todos = await Todo.findAll();
        console.log(todos.map(todo => todo.toJSON()));
    })();
    Todo.init({
        message: DataTypes.STRING
    }, { sequelize, modelName: 'todo' });
    console.log(`Example app listening at http://localhost:${port}`);
});

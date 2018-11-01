const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
app.use(bodyParser.json());

//select all
app.get('/', function (req, res) {
    knex.raw("SELECT * FROM posts").then((result) => {
            res.json(result.rows)
        })
        .catch((err) => {
            console.error(err)
        });
});

//create row
app.post('/create', (req, res) => {
    knex.raw(`INSERT INTO posts (content, author, upvotes) VALUES ('${req.body.content}','${req.body.author}',${req.body.upvotes});`).then((results) => {
            res.send('created')
        })
        .catch((err) => {
            console.error(err)
        });
});

//get by id
app.get('/:id', (req, res) => {
    knex.raw(`SELECT * FROM posts WHERE posts.id = ${req.params.id}`).then((results) => {
            res.json(results)
        })
        .catch((err) => {
            console.error(err)
        });
});

//update by id
app.patch('/:id', (req, res) => {
    knex.raw(`UPDATE posts SET content = '${req.body.content}' , author = '${req.body.author}' , upvotes = ${req.body.upvotes}
    WHERE posts.id = ${req.params.id}`).then((results) => {
    res.send('updated')
    })
    .catch((err) => {
        console.error(err)
    });
});

//delete by id
app.delete('/delete/:id', (req, res) => {
    knex.raw(`DELETE FROM posts WHERE posts.id = ${req.params.id};`).then((results) => {
            res.send('deleted')
        })
        .catch((err) => {
            console.error(err)
        });
});

app.listen(port, function () {
    console.log('Listening on', port);
});

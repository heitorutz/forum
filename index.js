const express = require('express');
const bodyParser = require('body-parser');

const connection = require('./database/database');
const Question = require('./database/Questions');
const Answer = require('./database/Answer');

const app = express();

connection
    .authenticate()
    .then(() => console.log('Connection success!'))
    .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    // SELECT * FROM forum
    Question.findAll({ raw: true, order: [ ['id', 'DESC'] ] }).then(questions => {
        res.status(200).render('index', {
            questions
        });
    });
});

app.get('/ask', (req, res) => {
    res.status(200).render('ask');
});

app.get('/question/:id', (req, res) => {
    const id = req.params.id;

    Question.findOne({
        where: { id }
    }).then(question => {
        if (question !== null) {

            Answer.findAll({
                where: {questionId: question.id},
                order: [ ['id', 'DESC'] ]
            }).then(answers => {
                res.render('question', {
                    question,
                    answers
                });
            });
        } else {
            res.redirect('/');
        }
    })
});

app.post('/ask', (req, res) => {
    const title = req.body.title;
    const description = req.body.desc;
    
    // INSERT INTO forum(title, desc) VALUES(...)
    Question.create({
        title,
        description
    }).then(() => {
        res.status(201).redirect('/');
    });
});

app.post('/question', (req, res) => {
    const body = req.body.body;
    const questionId = req.body.question;

    Answer.create({
        body,
        questionId
    }).then(() => {
        res.redirect(`/question/${questionId}`);
    })
});

app.listen(3000, (err) => {
    if (err) console.log(err);
    console.log('Server running!');
});


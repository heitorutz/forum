const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).render('index');
});

app.get('/ask', (req, res) => {
    res.status(200).render('ask');
});

app.post('/ask', (req, res) => {
    const title = req.body.title;
    const desc = req.body.desc;
    console.log(title, desc);
    res.status(200).render('ask');
});

app.listen(3000, (err) => {
    if (err) console.log(err);
    console.log('Server running!');
});
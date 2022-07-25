const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.status(200).render('index');
});

app.get('/ask', (req, res) => {
    res.status(200).render('ask');
});

app.listen(3000, (err) => {
    if (err) console.log(err);
    console.log('Server running!');
});
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/:name?', (req, res) => {
    const userName = req.params.name;
    const show = true;

    res.status(200).render('index', {
        name: userName,
        show
    });
});

app.listen(3000, (err) => {
    if (err) console.log(err);
    console.log('Server running!');
});
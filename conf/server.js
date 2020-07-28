const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const app = express();

const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));
app.use(bodyparser.json());
app.use(express.json());

const port = process.env.PORT || 8080;

app.get('*', function(req, res) {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log('Server started on port ', port, '!');
});

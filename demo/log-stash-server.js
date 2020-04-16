const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/logs', (req, res) => {
    req.body.forEach(record => fs.appendFileSync('debug.log', record + '\n'));
    res.send({ status: 'ok', message: 'saved' });
});

app.listen(PORT, () => console.log(`LogStash: http://localhost:${PORT}`));

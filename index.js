const express = require('express');

const dbRouter = require('./data/db-router');

const server = express();

server.get('/', (req, res) => {
    res.send(`
    <h2>Web Api Challenge 2</h>
    `);
});

server.use('/api/posts', dbRouter);

server.listen(4000, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
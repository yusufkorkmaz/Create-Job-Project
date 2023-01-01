const express = require('express');
const cors = require("cors");

const app = express();
app.use(cors());


app.get('/api/priorities', (req, res) => {
    res.json([
        { id: 1, name: 'Urgent' },
        { id: 2, name: 'Regular' },
        { id: 3, name: 'Trivial' }
    ]);
});

app.listen(3001, () => {
    console.log('API started on port 3001');
});

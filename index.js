const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
    user: '',
    host: 'localhost',
    database: 'expenseTracker',
    password: '',
    port: 5432,
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', async (req, res) => {
    const result = await pool.query('SELECT * FROM transactions');
    const transactions = result.rows;
    res.render('index', { transactions });
});

app.post('/add', async (req, res) => {
    const { description, amount, category } = req.body;
    await pool.query('INSERT INTO transactions (description, amount, category) VALUES ($1, $2, $3)', [description, amount, category]);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

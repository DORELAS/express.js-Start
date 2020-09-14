const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');

const app = express();

// init MIDDLEWARE
app.use(logger);

// HANDLEBARS MIDDLEWARE
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// BODY PARSER MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// SET A STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

// GET A SINGLE MEMBER
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`SERVER STARTED SUCCESSFUL!`);
});
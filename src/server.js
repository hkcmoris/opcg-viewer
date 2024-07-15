const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the "public" directory
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route to render EJS view
app.get('/', (req, res) => {
    res.render('index', { title: 'My API Viewer', setCode: 'OP07' });
});

// Route to render EJS view
app.get('/:setCode', (req, res) => {
    const setCode = req.params.setCode;
    res.render('index', { title: 'My API Viewer', setCode: setCode });
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
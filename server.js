const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/comments-proj'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/comments-proj/index.html'));
});

const port = process.env.PORT || 8080;

// Start the app by listening on the default Heroku port
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
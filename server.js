const express = require('express');
const path = require('path');
const port = process.env.PORT || 8081;
const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));

// send the user to index html page inspite of the url
app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port);

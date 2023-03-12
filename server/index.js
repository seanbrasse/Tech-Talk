const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import custom modules
const DataAccessObject = require('./dataAccessObject');
const Comment = require('./comment');

// Create an Express app
const app = express();

// Use CORS middleware
app.use(cors());

// Set port to environment variable or 3001
const port = process.env.PORT || 3001;

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a DataAccessObject instance
const dataAccessObject = new DataAccessObject('./database.sqlite3');

// Create a Comment instance
const comment = new Comment(dataAccessObject);

// Create a comments table if it does not exist
comment.createTable().catch(error => {
  console.log(`Error: ${JSON.stringify(error)}`);
});

// Handle a POST request to create a new comment
app.post('/createComment', function(request, response) {
  const { uuid, name, title, message } = request.body;
  comment.createComment({uuid, name, title, message}).then(result => {
    response.send(result);
  });
});

// Handle a GET request to get a specific comment
app.get('/getComment', function(request, response) {
  const { body } = request;
  const { uuid } = body;
  comment.getComment(uuid).then(result => {
    response.send(result);
  });
});

// Handle a GET request to get all comments
app.get('/getComments', function(request, response) {
  comment.getComments().then(result => {
    response.send(result);
  });
});

// Handle a DELETE request to delete all comments
app.delete('/deleteComments', function(request, response) {
  comment.deleteComments().then(result => {
    response.send(result);
  });
});

// Handle a DELETE request to delete a specific comment
app.delete('/deleteComment/:uuid', function(request, response) {
  const { uuid } = request.params;
  comment.deleteComment(uuid).then(result => {
    response.send(result);
  });
});

// Start listening on specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// Serve static files from 'public' directory
app.use(express.static('public'));

// Handle a GET request to the root URL
app.get('/', function(request, response) {
  const rootDir = __dirname.replace('/server', '');
  response.sendFile(`${rootDir}/src/index.html`);
});

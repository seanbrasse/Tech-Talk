const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const DataAccessObject = require('./dataAccessObject');
const Comment = require('./comment');

const app = express();
app.use(cors());
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dataAccessObject = new DataAccessObject('./database.sqlite3');
const comment = new Comment(dataAccessObject);

comment.createTable().catch(error => {
  console.log(`Error: ${JSON.stringify(error)}`);
});

app.post('/createComment', function(request, response) {
  const { uuid, name, title, message } = request.body;
  comment.createComment({uuid, name, title, message}).then(result => {
    response.send(result);
  });
});
 
app.get('/getComment', function(request, response) {
  const { body } = request;
  const { uuid } = body;
  comment.getComment(uuid).then(result => {
    response.send(result);
  });
});

app.get('/getComments', function(request, response) {
  comment.getComments().then(result => {
    response.send(result);
  });
});

app.delete('/deleteComments', function(request, response) {
  comment.deleteComments().then(result => {
    response.send(result);
  });
});

app.delete('/deleteComment/:uuid', function(request, response) {
  const { uuid } = request.params;
  comment.deleteComment(uuid).then(result => {
    response.send(result);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  const rootDir = __dirname.replace('/server', '');
  response.sendFile(`${rootDir}/src/index.html`);
});


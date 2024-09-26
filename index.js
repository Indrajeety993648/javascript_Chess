const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');

const app = express();
const server = createServer(app);
const path = require('path') 
const publicPath = path.join(__dirname, 'public');


console.log(publicPath);
app.use(express.static(publicPath));




app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});


app.post('/send_message', (req, res) => {
  console.log(req.body);
  res.send('ok');
});

app.get('/get_new_message', (req, res) => {
  console.log(req.body);
  res.send('ok');
});

server.listen(3001, () => {
  console.log('server running at http://localhost:3001');
});

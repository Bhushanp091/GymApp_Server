const express = require('express')
const app = express()



app.get('/', function (req, res) {
  res.send('Hello World');
})
app.get("/profile", function (req, res) {
  res.send("hello");
})
app.get("/profile/:username", function (req, res) {
  res.send(`hello ${req.params.username}`);
})

const jsonData = require('./json_data/Begineer_Chest.json');



  app.get('/api', (req, res) => {
    res.json(jsonData);
  });


app.listen(3000)
////////////////////// IMPORTS
const cors = require('cors');
const express = require('express')
const app = express()
const port = 8080
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // allows us to take in JSON in post body
app.use(cors()); // allows localhost to communicate with server

const db = require("./db.js")

////////////////////// ENDPOINTS

// GET handler: two imputs, request object and response object (what's coming in / what's going out)
app.get('/', (req, res) => {
  res.send('Hello World!')
});

// API design here


app.post("/", (req, res) => {
  console.log(req.body)

  db.insertDocument(req.body).then((_id) => {
    res.send({
      ok: true,
      _id: _id
    });

  });
});

app.get("/", (req, res) => {
  var id = req.query.id;
  console.log(id);
  db.getDocument(id).then((ans) => {
    
    res.send({
      ok: true,
      arr: ans
      
    });
   
});
});


// "main" method, launches the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
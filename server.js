var andi = require('./store-service');
var express = require("express");
const path = require('path');
var app = express();

// setup a 'route' to listen on the default url path
app.get('/', (req, res) => {
  res.redirect('/about');
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get('/items', (req, res) => {
  andi.getallitems()
    .then((items) => {
      res.json(items);
    })
    .catch((error) => {
      res.json("No items available.");
    });
});

app.get('/categories', (req, res) => {
  andi.getCategories()
    .then((categories) => {
      res.json(categories);
    })
    .catch((error) => {
      res.json("No categories available.");
    });
});
app.get('/shop', (req, res) => {
  andi.getallitems()
    .then((items) => {
      res.json(items);
    })
    .catch((error) => {
      res.json("Error");
    });
});

app.use(function(req, res) {
  res.status(404).send("Page Not Found");
});

const port = process.env.PORT || 8080;
andi.initialise()
  .then(() => {
    app.listen(port, () => {
      console.log(`Express http server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log('Error occurred while initializing:', error);
  });

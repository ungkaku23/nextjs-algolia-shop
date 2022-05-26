const { default: SleekShop } = require("@trefox/sleekshop-js");
const express = require("express")
      app = express(),
      session = require('express-session'),
      bodyParser = require("body-parser"),
      path = require('path'),
      cors = require('cors'),
      sleekShop = new SleekShop("https://neverland.sleekshop.net", "neverland_72tGoDd5Z3qWEiI8LMGD", "oPhX69kW2izJ2YgdNkjr", "aJ5l6s8EqKpvHcG8yD1i");

app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'bla bla bla' 
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, './client/build')));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.post("/sleekshop", async (req, res) => {
  const data = await eval(req.body.invoke);
  res.json(data);
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
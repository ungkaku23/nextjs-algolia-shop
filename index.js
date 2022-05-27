const { default: SleekShop } = require("@trefox/sleekshop-js");
const express = require("express")
      app = express(),
      session = require('express-session'),
      bodyParser = require("body-parser"),
      path = require('path'),
      cors = require('cors'),
      sleekShop = new SleekShop("https://maxundmurat.sleekshop.net", "maxundmurat_HcDbZqlx83ZKoyjyU7WT", "AJCEU136IYanex2BZRuy", "PJkHatIN4X98Agj3l41Y")
  

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
  console.log(req.body.invoke);
  const data = await eval(req.body.invoke);
  res.json(data);
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
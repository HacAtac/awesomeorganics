const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection.js");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); //dont think my azure app is recognizing this static file. So what you need to do instead is  app.use(express.static(path.join(__dirname, "public")));  and then in your html file you need to add the path to the file. So instead of  <link rel="stylesheet" href="style.css">  you need to do  <link rel="stylesheet" href="/style.css">  and then it should work.

app.use(require("./controllers/"));

app.listen(PORT, () => {
  console.log(`Happy Coding! ${PORT}!`);
  sequelize.sync({ force: false });
});

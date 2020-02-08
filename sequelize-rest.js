/**
 * npm run start_sequelize-rest.js
 * -> To start development server.
 */

// imports
const cors = require("cors");
const Express = require("express");
const Sequelize = require("sequelize");
const { logMiddleware } = require("./middleWareFunctions/logMiddleware");
// using Server database or local development server
const databaseUrl =
  process.env.DATABASE ||
  "postgres://postgres:password@localhost:5432/postgres";

// Initialisation of cors // sequalize // express
const corsMiddleware = cors();
const db = new Sequelize(databaseUrl);
const app = new Express();

// Model definition of a movie
const Movie = db.define("movie", {
  title: Sequelize.STRING,
  year: Sequelize.INTEGER,
  synopsis: Sequelize.TEXT
});

// sync the model with the database.
db.sync({ force: false }) // Turn on if data needs to removed on each restart of server -> Needed if models changes.
  .then(() => console.log("database scheme updated..."))
  .then(() =>
    Promise.all([
      Movie.create({
        title: "Terminator 1",
        year: 1991,
        synopsis:
          "One angry Robot trying to kill the leader of the future resistance."
      }),
      Movie.create({
        title: "Terminator 2",
        year: 1992,
        synopsis:
          "Two angry Robots trying to kill the leader of the future resistance."
      }),
      Movie.create({
        title: "Terminator 3",
        year: 1993,
        synopsis:
          "Three angry Robots trying to kill the leader of the future resistance."
      })
    ])
  )
  .catch(error => {
    console.error("Not able to create tables", error);
    process.exit(1); //1 - Uncaught Fatal Exception: There was an uncaught exception, and it was not handled by a domain or an uncaughtException event handler.
  });

// app level
app.use(corsMiddleware, logMiddleware, Express.json());

//Route level.
// Root domain level. Just displaying a welcome message.
app.get("/", (req, res) => res.send("<h1>Rest Api - Homework Assignment</h1>"));

/**
 * CRUD implementation.
 */

// Create // make movie entry.
// Test with => http POST :3000/movie title="The best movie evahh" year=1984 synopsis="the best movie ever"
app.post("/movie", (req, res, next) => {
  Movie.create(req.body)
    .then(movie => res.json(movie))
    .catch(next);
});
// Read // display a movie or several movies.
app.get("/movie", (req, res, next) => {
  //Just finds everything.
  //   Movie.findAll()
  //   .then(result => res.json(result))
  //   .catch(error => next(error));
  const { limit, offset } = req.query;
  Movie.findAndCountAll({ limit: limit, offset: offset })
    .then(movies => {
      res.json(movies);
    })
    .catch(error => next(error));
});

app.get("/movie/:id", (req, res, next) => {
  Movie.findByPk(req.params.id)
    .then(movie => {
      if (!movie) {
        res.sendStatus(404).end();
      } else {
        res.json(movie);
      }
    })
    .catch(next);
});
// update // Update an entry of an movie.
app.put("/movie/:id", (req, res, next) => {
  Movie.findByPk(req.params.id)
    .then(movie => {
      if (movie) {
        Movie.update(req.body, { where: { id: req.params.id } }).then(movie => {
          res.json(movie);
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

// Delete // Delete a movie.
app.delete("/movie/:id", (req, res, next) => {
  Movie.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(deletedMovie => {
      if (deletedMovie) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});
// TODO:
// using Server port database or local development server port

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`
/**
 * 1. REST APIs Homework Assignment
 * 1.2. Use Sequelize to build a REST API.
 * Server listens to port: ${port}
 **/
  `)
);

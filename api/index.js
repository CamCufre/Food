const server = require('./src/app.js');
const { conn } = require('./src/db.js');

port = process.env.PORT;

// Syncing all the models at once.
// conn.sync({ force: true }).then(() => { //force es para romper todo, para hacer grandes cambios en la db
conn.sync({ alter: true }).then(() => { //con esta wea no c borran los datos de la db, pa deployear en false
  server.listen(port, () => {
    console.log(`listening at ${port}`); // eslint-disable-line no-console
  });
});


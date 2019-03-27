const settings = require("./settings"); // settings.json

var knex = require('knex')({
  client: 'postgresql',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
  }
});

const [firstName, lastName, birthdate] = process.argv.slice(2)

function addPerson(firstName, lastName, birthdate) {
  knex("famous_people")
  .insert({first_name: firstName, last_name: lastName, birthdate: birthdate})
  .asCallback(function(err, rows) {
    if (err) {
      console.error(err)
      return
    }
    console.log(rows)
    return knex.destroy();
  })
}


addPerson(firstName, lastName, birthdate)



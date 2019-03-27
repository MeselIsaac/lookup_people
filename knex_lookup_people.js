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

const [name] = process.argv.slice(2);

function findName(name) {
  knex("famous_people").select().where('first_name', 'ilike', `%${name}%`)
  .orWhere('last_name', 'ilike', `%${name}%`)
  .asCallback(function(err, rows) {
    if (err) {
      console.error(err)
      return
    }
    rows.forEach(famous_people => {
      console.log(`- ${famous_people.first_name} ${famous_people.last_name} born ${famous_people.birthdate}`);
      return knex.destroy();
    });
  })

}


   findName(name);



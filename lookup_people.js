const pg = require("pg");
const settings = require("./settings"); // settings.json

const [cmd, data] = process.argv.slice(2);

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect()

function findName(client, data) {
  const query = "SELECT * FROM famous_people WHERE first_name LIKE $1::text OR last_name LIKE $1::text"
  const values = ['%' + data + '%'];

  client.query(query, values, (err, res) => {
    if (err) {
      console.log(err);
      return false;
    }

    res.rows.forEach(famous_people => {
      console.log("- " + famous_people.first_name + " " + famous_people.last_name + ", born " + famous_people.birthdate);
      client.end();
    });
  })
}

if (cmd === 'name') {
  findName(client, data);
}


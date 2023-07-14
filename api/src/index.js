const app = require("./app.js");
const { conn } = require("./DB_connection.js");

const PORT = 5040;

app.listen(PORT, async () => {
  console.log(`Server raised in port: http://localhost:${PORT}`);
  await conn.sync({ force: true });
});
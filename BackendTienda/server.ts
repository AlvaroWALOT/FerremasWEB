import express, { Application } from "express";
import mysql, { Connection } from "mysql";

const app: Application = express();
const PORT: number = 3306;

const DB: Connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tienda",
});

DB.connect((err: mysql.QueryError | null) => {
  if (err) {
    throw err;
  }
  console.log("Conexión exitosa a MySQL");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

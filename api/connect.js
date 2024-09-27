import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",  // Pisahkan host dan port
  port: 3306,         // Tambahkan port secara terpisah
  user: "root",
  password: "Sorayah97#",
  database: "social"
});

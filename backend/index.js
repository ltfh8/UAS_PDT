import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
  host: "mysql-master",
  database: "buku",
  port: "3306",
  user: "app",
  password: "root",
});

app.use(express.json());
app.use(cors());

app.post("/books", (req, res) => {
  const q = "INSERT INTO buku (judul,deskripsi,harga,cover) VALUES(?)";
  const values = [
    req.body.judul,
    req.body.deskripsi,
    req.body.harga,
    req.body.cover,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("buku berhasil ditambahkan");
  });
});

app.get("/", (req, res) => {
  res.json("hello this is backend");
});

app.get("/books", (req, res) => {
  const q = "select * from buku";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM buku WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Buku berhasil dihapus");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE buku SET `judul`=?, `deskripsi`=?, `harga`=?, `cover`=? WHERE id = ?";
  const values = [
    req.body.judul,
    req.body.deskripsi,
    req.body.harga,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Buku berhasil diupdate");
  });
});

app.listen(8800, () => {
  console.log("konek ke backend!!111!");
});

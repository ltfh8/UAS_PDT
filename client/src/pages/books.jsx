import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/books/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      Toko Buku
      <div className="books">
        {books.map((buku) => (
          <div className="buku" key={buku.id}>
            {buku.cover && <img src={buku.cover} alt="" />}
            <h2>{buku.judul}</h2>
            <p>{buku.deskripsi}</p>
            <span>{buku.harga}</span>
            <button className="delete" onClick={() => handleDelete(buku.id)}>
              Delete
            </button>
            <button className="update">
              {" "}
              <Link to={`/update/${buku.id}`}> Update</Link>
            </button>
          </div>
        ))}
      </div>
      <button className="addHome">
        <Link to="/add">Tambah buku baru</Link>
      </button>
    </div>
  );
};

export default Books;

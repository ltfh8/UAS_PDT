import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Add = () => {
  const [buku, setBook] = useState({
    judul: "",
    deskripsi: "",
    harga: null,
    cover: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", buku);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(buku);
  return (
    <div className="form">
      <h1>Tambah Buku Baru</h1>
      <input
        type="text"
        placeholder="Judul"
        onChange={handleChange}
        name="judul"
      />
      <input
        type="text"
        placeholder="Deskripsi"
        onChange={handleChange}
        name="deskripsi"
      />
      <input
        type="number"
        placeholder="Harga"
        onChange={handleChange}
        name="harga"
      />
      <input
        type="text"
        placeholder="Cover"
        onChange={handleChange}
        name="cover"
      />
      <button className="formButton" onClick={handleClick}>
        Tambah
      </button>
    </div>
  );
};

export default Add;

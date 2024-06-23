import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const [buku, setBook] = useState({
    judul: "",
    deskripsi: "",
    harga: null,
    cover: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/books/" + bookId, buku);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(buku);
  return (
    <div className="form">
      <h1>Update Buku</h1>
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
        Update
      </button>
    </div>
  );
};

export default Update;

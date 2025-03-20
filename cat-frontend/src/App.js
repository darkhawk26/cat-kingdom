import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/cats";

function App() {
  const [cats, setCats] = useState([]);
  const [form, setForm] = useState({ name: "", age: "", breed: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCats();
  }, []);

  const fetchCats = async () => {
    const response = await axios.get(API_URL);
    setCats(response.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, form);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ name: "", age: "", breed: "" });
    setEditingId(null);
    fetchCats();
  };

  const handleEdit = (cat) => {
    setForm(cat);
    setEditingId(cat.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchCats();
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🐱 Котешко Кралство 🐾</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input name="name" placeholder="Име" value={form.name} onChange={handleChange} required />
        <input name="age" placeholder="Възраст" type="number" value={form.age} onChange={handleChange} required />
        <input name="breed" placeholder="Порода" value={form.breed} onChange={handleChange} required />
        <button type="submit">{editingId ? "Запази" : "Добави"}</button>
      </form>

      <ul>
        {cats.map((cat) => (
          <li key={cat.id}>
            {cat.name} ({cat.age} г.) - {cat.breed}
            <button onClick={() => handleEdit(cat)}>✏️</button>
            <button onClick={() => handleDelete(cat.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

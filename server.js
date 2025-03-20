const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let cats = [];

// GET /cats - връща всички котки
app.get("/cats", (req, res) => {
    res.json(cats);
});

// POST /cats - добавя нова котка
app.post("/cats", (req, res) => {
    const { name, age, breed } = req.body;
    if (!name || !age || !breed) {
        return res.status(400).json({ message: "Всички полета са задължителни!" });
    }
    const newCat = { id: uuidv4(), name, age, breed };
    cats.push(newCat);
    res.status(201).json(newCat);
});

// PUT /cats/:id - редактира информация за котка
app.put("/cats/:id", (req, res) => {
    const { id } = req.params;
    const { name, age, breed } = req.body;
    const catIndex = cats.findIndex(cat => cat.id === id);
    if (catIndex === -1) {
        return res.status(404).json({ message: "Котката не е намерена!" });
    }
    cats[catIndex] = { ...cats[catIndex], name, age, breed };
    res.json(cats[catIndex]);
});

// DELETE /cats/:id - изтрива котка
app.delete("/cats/:id", (req, res) => {
    const { id } = req.params;
    cats = cats.filter(cat => cat.id !== id);
    res.json({ message: "Котката беше изтрита успешно." });
});

app.listen(PORT, () => {
    console.log(`Котешкият сървър работи на http://localhost:${PORT}`);
});

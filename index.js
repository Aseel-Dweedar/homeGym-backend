const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

mongoose.connect("mongodb://localhost:27017/equip", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const apiEquip = require("./controllers/apiEquip.controller");
const apiExer = require("./controllers/apiExer.controller");
const { getAll, createEquip, getEquip, deleteEquip, updateEquip } = require("./controllers/crud.controller");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("It is alive !!");
});

app.get("/equip", apiEquip);
app.get("/exer", apiExer);
app.get("/all", getAll);

app.post("/crud", createEquip);
app.get("/crud", getEquip);
app.delete("/crud/:idx", deleteEquip);
app.put("/crud/:idx", updateEquip);

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});
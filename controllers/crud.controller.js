"use strict";

const userModel = require("../models/userSchema");

const getAll = (req, res) => {
    userModel.find({}, (error, user) => {
        if (error) {
            res.send(error.message);
        } else {
            if (user === null) {
                let user = new userModel({ email, equipment: [] });
                user.save();
            }
            res.send(user);
        }
    });
};

const createEquip = (req, res) => {
    const { name, price, quantity, image_url } = req.body;
    const { email } = req.query;
    userModel.findOne({ email: email }, (error, user) => {
        if (error) {
            res.send(error.message);
        } else {
            user.equipment.push({ name, price, quantity, image_url });
            user.save();
            res.send(user);
        }
    });
};

const getEquip = (req, res) => {
    const { email } = req.query;
    userModel.findOne({ email: email }, (error, user) => {
        if (error) {
            res.send(error.message);
        } else {
            if (user === null) {
                let user = new userModel({ email, equipment: [] });
                user.save();
            }
            res.send(user);
        }
    });
};

const deleteEquip = (req, res) => {
    const idx = req.params.idx;
    const { email } = req.query;
    userModel.findOne({ email: email }, (error, user) => {
        if (error) {
            res.send(error.message);
        } else if (idx === "all") {
            user.equipment = [];
            user.save();
            res.send(user);
        } else {
            user.equipment.splice(idx, 1);
            user.save();
            res.send(user);
        }
    });
};

const updateEquip = (req, res) => {
    const { name, price, quantity, image_url } = req.body;
    const idx = req.params.idx;
    const { email } = req.query;
    userModel.findOne({ email: email }, (error, user) => {
        if (error) {
            res.send(error.message);
        } else {
            user.equipment.splice(idx, 1, { name, price, quantity, image_url });
            user.save();
            res.send(user);
        }
    });
};

module.exports = { getAll, createEquip, getEquip, deleteEquip, updateEquip };
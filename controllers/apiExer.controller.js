"use strict";

const axios = require("axios");
const exerData = require("../assets/exerData.json");
const Exer = require("../models/exer.model");
const Cache = require("../helper/cache");
const cacheObj = new Cache();

const apiExer = (req, res) => {
    const equipId = req.query.equipment;
    const reqKey = `Exercise ${equipId}`;

    if (cacheObj[reqKey] && Date.now() - cacheObj[reqKey].time < 785000) {
        res.send(cacheObj[reqKey].data);
    } else {
        axios
            .get(`https://wger.de/api/v2/exercise?equipment=${equipId}&language=2`)
            .then((axiosRes) => {
                let newExer = axiosRes.data.results.slice(0, 4).map((exer, idx) => {
                    let modelExer = new Exer(exer);
                    modelExer.imageUrl = exerData[equipId].imageUrl[idx];
                    return modelExer;
                });
                cacheObj[reqKey] = {};
                cacheObj[reqKey].data = newExer;
                cacheObj[reqKey].time = Date.now();
                res.send(newExer);
            })
            .catch((error) => {
                res.send(error.message);
            });
    }
};

module.exports = apiExer;
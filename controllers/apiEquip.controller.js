"use strict";

const axios = require("axios");
const equipData = require("../assets/equipData.json");
const Cache = require("../helper/cache");
const cacheObj = new Cache();

const apiEquip = (req, res) => {
    const reqKey = "equip";
    if (cacheObj[reqKey] && Date.now() - cacheObj[reqKey].time < 785000) {
        res.send(cacheObj[reqKey].data);
    } else {
        axios
            .get("https://wger.de/api/v2/equipment")
            .then((axiosRes) => {
                let finalEquip = axiosRes.data.results
                    .filter((Equip) => Equip.id !== 5)
                    .map((Equip) => {
                        Equip.image_url = equipData[Equip.id].image_url;
                        Equip.description = equipData[Equip.id].description;
                        Equip.price = equipData[Equip.id].price;
                        return Equip;
                    });
                cacheObj[reqKey] = {};
                cacheObj[reqKey].data = finalEquip;
                cacheObj[reqKey].time = Date.now();
                res.send(finalEquip);
            })
            .catch((error) => {
                res.send(error.message);
            });
    }
};

module.exports = apiEquip;
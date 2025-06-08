const express = require('express');
const {CreateCharger, allCharger,updateCharger, deleteCharger,getCharger} = require("../controller/chargercontroller");
const { protectRoute } = require('../middleware/authmidleware');
const chargerRouter = express.Router();

chargerRouter.post("/addCharger",protectRoute,CreateCharger)
chargerRouter.get("/allCharger",protectRoute,allCharger)
chargerRouter.put("/updateCharger/:id",protectRoute,updateCharger)
chargerRouter.put("/deleteCharger/:id",protectRoute,deleteCharger)
chargerRouter.get("/getCharger/:id",protectRoute,getCharger)

module.exports = chargerRouter;
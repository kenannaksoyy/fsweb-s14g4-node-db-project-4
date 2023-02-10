const express = require("express");
const router = express.Router();
const tariflerModel = require("./tarifler-model.js");


const mW = require("./tarifler-mw");

router.get("/:id", mW.checkTarifId, async(req, res, next) => {
    try{
        res.status(200).json(req.tarif);
    }
    catch(err){
        next(err);
    }
});
  
router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
    message: err.message,
    });
});
  
  module.exports = router;
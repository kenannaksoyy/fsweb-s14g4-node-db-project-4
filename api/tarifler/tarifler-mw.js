const tariflerModel = require("./tarifler-model.js");
exports.checkTarifId = async(req, res, next) => {
    try{
        const possible = await tariflerModel.idyeGoreTarifGetir(req.params.id);
        if(possible == 0){
          next({
            status:404,
            message:`${req.params.id} id li Tarif bulunamadı`
          })
        }
        else{
          req.tarif=possible;
          next();
        }
    } 
    catch(err){
        next(err)
    }
};
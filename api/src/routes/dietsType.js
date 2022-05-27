const { Router } = require("express");
const router = Router();
const axios = require("axios") ;
const { Diets } = require("../db.js");
require('dotenv').config();
const { YOUR_API_KEY, YOUR_API_KEY2, YOUR_API_KEY3, YOUR_API_KEY4, YOUR_API_KEY5, YOUR_API_KEY10, YOUR_API_KEY11  } = process.env;




router.get("/", async (req, res, next) => {
try {
    const info = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY10}&addRecipeInformation=true&number=10`);
    const diets = info.data?.results.map(e => e.diets);
    const flatDiets = diets.flat();
    const finalList = [...new Set(flatDiets)];
    console.log(finalList);

    finalList.forEach( e => {
        Diets.findOrCreate({
            where: {name: e}
        });
    });

    const allDiets = await Diets.findAll();
    res.status(200).send(allDiets);
   
} catch (error) {
    next(error);
}
});




module.exports = router;
const {Sequelize} = require('sequelize');
const axios = require("axios");
const { Recipe, Diets } = require("../db");
const { YOUR_API_KEY, YOUR_API_KEY2, YOUR_API_KEY3, YOUR_API_KEY4, YOUR_API_KEY5, YOUR_API_KEY10, YOUR_API_KEY11 } = process.env;

const getIdApi = async(id) => {
    try {
        const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY4}&number=10`);
       // const recipeInfo = [apiUrl];
        const e = apiUrl.data;
        return {
            id: e.id,
            title: e.title,
            summary: e.summary.replace(/<[^>]*>?/g, ''),
            spoonacularScore: e.spoonacularScore,
            healthScore: e.healthScore,
            servings: e.servings,
            readyInMinutes: e.readyInMinutes,
            image: e.image,
            diets: e.diets.map( (e) => {return {name: e}}),
            instructions: e.instructions.replace(/<[^>]*>?/g, ''),
            dishTypes: e.dishTypes.map(e => {return {name: e}}),
           
        };

   
    //return info;
    } catch (error) {
        return undefined;
    }


};
const getIdDb = async(id) => {
    try {
        const dbId = await Recipe.findByPk(id, {
            include:{
                model: Diets,
                attributes: ["name"],
                through: {
                    attributes: [],
                }
            }
        });
        
        return dbId;

    } catch (error) {
        
        return undefined;
    
    }

};

const getIdAll = async(id) => {
    const idApi =  getIdApi(id);
    const idDb = getIdDb(id);
    const [Api, Db] = await Promise.all([idApi, idDb]);
    return Api || Db;
};

module.exports = {
    getIdApi,
    getIdDb,
    getIdAll,
};
const {Sequelize} = require('sequelize');
const axios = require("axios");
const { Recipe, Diets } = require("../db");
const { YOUR_API_KEY, YOUR_API_KEY2, YOUR_API_KEY3, YOUR_API_KEY4, YOUR_API_KEY5, YOUR_API_KEY10, YOUR_API_KEY11 } = process.env;

const getApiRecipes = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY10}&number=10&addRecipeInformation=true`);
    const recipeInfo = await apiUrl.data?.results.map( e => {
        return {
            id: e.id,
            title: e.title,
            summary: e.summary,
            spoonacularScore: e.spoonacularScore,
            healthScore: e.healthScore,
            servings: e.servings,
            readyInMinutes: e.readyInMinutes,
            image: e.image,
            diets: e.diets.map( (e) => {return {name: e}}),
            steps: e.analyzedInstructions[0]?.steps.map((e) => {return e.step}),
            dishTypes: e.dishTypes.map(e => {return {name: e}})
        };

    });
    return recipeInfo;
};

const getDbRecipes = async () => {
    return await Recipe.findAll({
        include: {
            model: Diets,
            attributes: ["name"],
            through:{
                attributes: [],
            }
        } 
    });
};


const getfusionRecipes = async () => {
    const apirecipe = await getApiRecipes();
    const dbrecipe = await getDbRecipes();
    const allRecipes = [...apirecipe, ...dbrecipe];
   // console.log(allRecipes);
    return allRecipes;
};

//console.log(getfusionRecipes());

module.exports ={
    getfusionRecipes,
    getApiRecipes,
    getDbRecipes
} ;
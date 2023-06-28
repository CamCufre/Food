import axios from 'axios';
const API_URL = 'http://localhost:3001'

export const getAllRecipes = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/recipes/home`);
      const recipes = response.data;

      dispatch({
        type: 'GET_ALL_RECIPES',
        payload: recipes
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getRecipesByName = (name) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${API_URL}/recipes?name=${name}`);
        const recipes = response.data

        dispatch({
          type: 'GET_ALL_RECIPES',
          payload: recipes
        });
      } catch (error) {
        console.log(error.message);
      }
    };
  };

export const getRecipesById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/recipes/${id}`);
      const recipes = response.data;

      dispatch({
        type: 'GET_ALL_RECIPES',
        payload: recipes
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getDietTypes = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/diets`)

            dispatch({
                type: 'GET_DIET_TYPES',
                payload: response.data,
              });
        } catch (error) {
        console.log(error.message);
        }
    }
};

export const createRecipe = (recipe) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/recipes/`, recipe);

      dispatch({
        type: 'CREATE_RECIPE',
        payload: response.data,
      });

    } catch (error) {
      console.log(error.message);
    }
  };
};

export const filterByDiet = (diet) => {
  return {
    type: 'FILTER_BY_DIET',
    payload: diet
  }
};

export const filterByCreated = (value) => {
  return {
    type: 'FILTER_BY_CREATED',
    payload: value
  }
};

export const orderByHealthscore = (order) => {
  return {
    type: 'ORDER_BY_HEALTHSCORE',
    payload: order
  }
};

export const orderByAlpha = (order) => {
  return {
    type: 'ORDER_BY_ALPHA',
    payload: order
  }
};

export const getRecipeDetails = (id) => {

  return async (dispatch) => {
    try {
      if (id === null) {
        dispatch({
          type: 'GET_RECIPE_DETAILS',
          payload: null
        })
      }
      const response = await axios.get(`${API_URL}/recipes/${id}`);
      const recipe = response.data;

      dispatch({
        type: 'GET_RECIPE_DETAILS',
        payload: recipe
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
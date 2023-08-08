  const initialState = {
    allHomeRecipes: [],
    allHomeRecipesCopy: [],
    dietTypes: [],
    recipeDetails: null,
    didLog: false
  };
  
  const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case 'GET_ALL_RECIPES':
        return {
          ...state,
          allHomeRecipes: payload,
          allHomeRecipesCopy: payload
        };
      case 'GET_DIET_TYPES':
        return {
          ...state,
          dietTypes: payload
        };
      case 'CREATE_RECIPE':
        return {
          ...state,
          allHomeRecipes: [...state.allHomeRecipes, payload]
        };
      case 'FILTER_BY_DIET':
        const allHomeRecipesDiet = state.allHomeRecipesCopy.filter(recipe => recipe.diets.includes(payload));
        return {
          ...state,
          allHomeRecipes: allHomeRecipesDiet
        };
      case 'FILTER_BY_CREATED':
        const allHomeRecipesCreated = [...state.allHomeRecipesCopy]
        return {
          ...state,
          allHomeRecipes: payload === 'db'
            ? allHomeRecipesCreated.filter(recipe => recipe.hasOwnProperty('created'))
            : allHomeRecipesCreated.filter(recipe => !recipe.hasOwnProperty('created'))
        };
      case 'ORDER_BY_HEALTHSCORE':
        const allHomeRecipesSort = [...state.allHomeRecipes];
        return {
          ...state,
          allHomeRecipes: payload === 'Min'
            ? allHomeRecipesSort.sort((a, d) => a.healthscore - d.healthscore)
            : allHomeRecipesSort.sort((a, d) => d.healthscore - a.healthscore)
        };
      case 'ORDER_BY_ALPHA':
        const allHomeRecipesAlpha = [...state.allHomeRecipes];
        return {
          ...state,
          allHomeRecipes: payload === 'A'
            ? allHomeRecipesAlpha.sort((a, d) => a.name.localeCompare(d.name))
            : allHomeRecipesAlpha.sort((a, d) => d.name.localeCompare(a.name))
        };
      case 'GET_RECIPES_BY_ID':
        return {
          ...state,
          allHomeRecipes: payload
        };
      case 'GET_RECIPES_BY_NAME':
        return {
          ...state,
          allHomeRecipes: payload
        };
      case 'GET_RECIPE_DETAILS':
        return {
          ...state,
          recipeDetails: payload
        }
      case 'DID_LOG':
        return {
          ...state,
          didLog: payload
        }
      default:
        return state;
    }
  };
  
  export default reducer;
  
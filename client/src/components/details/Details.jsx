import { connect } from "react-redux";
import { getRecipeDetails } from "../redux/actions";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from '../navbar/NavBar';
import style from './Details.module.css'
import { Link } from "react-router-dom";

const Details = ({ recipeDetails, getRecipeDetails }) => {
  const { id } = useParams();
  const [diets, setDiets] = useState('no related diets');
  const [recipe, setRecipe] = useState({
    name: '',
    image: '',
    diets: '',
    description: '',
    steps: [''],
    id: ''
  });

  useEffect(() => {
    getRecipeDetails(id);

    return () => {
      getRecipeDetails(null)
    }
  }, [getRecipeDetails, id]);

  useEffect(() => {
    if ( recipeDetails !== null && recipeDetails.length > 0) {
      setRecipe(recipeDetails[0]);
      if (recipeDetails[0].diets && recipeDetails[0].diets.length > 0) {
        setDiets(recipeDetails[0].diets);
      }
    }
  }, [recipeDetails]);

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.background = "white";

    return () => {
      body.style.background = "";;
    };
  }, []);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <Link to='/home'>
      <button className={style.tohome}>To Home</button>
      </Link>
      <img className={style.foto} alt='' src={recipe.image}/>
      <div className={style.details}>
        <h1 className={style.title}>{recipe.name}</h1>
        <h5 className={style.id}>recipe ID: {recipe.id}</h5>
        <h5 className={style.diets}>Diets: {diets}. Health-Score: {recipe.healthscore}</h5>
        <h5 className={style.description}>{recipe.description}</h5>    
        <h5 className={style.steptitle}>Instructions:</h5>
        <div className={style.stepcontainer}>
          <h5 className={style.step}>{recipe.steps.map(
            (step, index) => {
              return <p key={index}>{index + 1}. {step}</p>
            }
          )}</h5>
        </div>
        
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  recipeDetails: state.recipeDetails,
});

const mapDispatchToProps = {
  getRecipeDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);

import { connect } from "react-redux";
import { getRecipeDetails } from "../redux/actions";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
    <div className={style.all}>
      <Link to='/home'>
      <button className={style.tohome}>To Home</button>
      </Link>
      <div className={style.foto} style={{ background:`url(${recipe.image})`, width:"200px", height:"200px", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', borderRadius:"50%"}}></div>
      <div className={style.details}>
        <h1 className={style.title}>{recipe.name}</h1>
        <h5 className={style.id}>recipe ID: {recipe.id}</h5>
        <h5 className={style.diets}>Diets: {diets}. Health-Score: {recipe.healthscore}</h5>
        <h5 className={style.description}>{recipe.description}</h5>    
        <div className={style.stepcontainer}>
        <h5 className={style.steptitle}>Instructions:</h5>
        <h5 className={style.step}>
      {recipe.steps.map((step, index) => {
        const colorStyle = index % 2 === 0 ? { color: "rgb(184, 219, 255)" } : { color: "rgb(181, 133, 230)" };
        return (
          <p key={index}>
            <span style={colorStyle}>{index + 1}. </span>
            {step}
          </p>
        );
      })}
    </h5>
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

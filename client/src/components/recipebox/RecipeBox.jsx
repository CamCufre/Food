import {Link} from 'react-router-dom';
import style from './RecipeBox.module.css';

const RecipeBox = ({id, name, image, healthscore, diets}) => {
    
    return (
        <div className={style.recipe}>
            <div className={style.circle} style={{ background: `url(${image})` }}></div>
            <div className={style.box}>
            <Link to={`/recipeDetails/${id}`}>
            <h2 className={style.name}>{name}</h2>
            </Link>
            <h5 className={style.id}>ID: {id}</h5>
            <h5 className={style.hs}>Health-Score: {healthscore} </h5>
            <h5 className={style.diets}>Diets: {diets}. </h5>
            </div>
        </div>
    )
}

export default RecipeBox;
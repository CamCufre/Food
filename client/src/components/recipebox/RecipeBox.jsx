import style from './RecipeBox.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeBox = ({ id, name, image, healthscore, diets }) => {
  const navigate = useNavigate();
  const [flippedCards, setFlippedCards] = useState({});

  const navigateRecipe = () => {
    navigate(`/recipeDetails/${id}`);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleMouseEnter = (id) => {
    setFlippedCards((prevFlippedCards) => ({
      ...prevFlippedCards,
      [id]: true,
    }));
  };

  const handleMouseLeave = (id) => {
    setFlippedCards((prevFlippedCards) => ({
      ...prevFlippedCards,
      [id]: false,
    }));
  };

  return (
    <div
      className={style.recipe}
      onMouseEnter={() => handleMouseEnter(id)}
      onMouseLeave={() => handleMouseLeave(id)}
      onClick={navigateRecipe}
    >
      <div
        className={`${style.box} ${flippedCards[id] ? style.flipped : ''}`}
        style={{
          background: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {!flippedCards[id] ? (
          <div className={style.bb}>
            <h2 className={style.name}>
              {name}
            </h2>
          </div>
        ) : (
          <div className={style.flippedbg}>
          <div className={style.flippedContent}>
            <h5 className={style.id}>ID: {id}</h5>
            <h5 className={style.hs}><span style={{color:"rgb(214, 214, 214)"}}>Health-Score:</span> {healthscore} </h5>
            <h5 className={style.diets}>
            <span style={{color:"rgb(214, 214, 214)"}}>Diets:</span> {diets.length !== 0 ? diets : 'not related diets'}.{' '}
            </h5>
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeBox;

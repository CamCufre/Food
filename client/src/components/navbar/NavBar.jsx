import { Link } from 'react-router-dom';
import style from './NavBar.module.css';
import logoSvg from '../assets/logo.svg';

const NavBar = () => {
  return (
    <header>
      <nav className={style.container}>
        <Link to='/home'>
          <img className={style.img} src={logoSvg} alt="Logo" height="53px" width="54.5823px" />
        </Link>
        <div className={style.buttoncontainer}>
        <Link to='/createRecipe'>
          <button className={style.button}>Create new Recipe</button>
        </Link>
        <Link to='/'>
          <button className={style.button}>Welcome</button>
        </Link>    
        </div>
        <div className={style.search}>    
        </div>
       
      </nav>

    </header>
  );
};

export default NavBar;

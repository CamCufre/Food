import { Link } from 'react-router-dom';
import style from './NavBar.module.css';
import logoSvg from '../assets/logo.svg';
import Login from '../login/Login';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const reload = () => {
    navigate('/home')
    window.location.reload();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <header>
      <nav className={style.container}>
        <div className={style.imgs}>
          <img className={style.img} src={logoSvg} alt="Logo" height="53px" width="54.5823px" onClick={reload} />
        </div>
        {/* <div className={style.buttoncontainer}> */}
        <div className={style.buttons}>
        <Link to='/createRecipe'>
          <button className={style.button}>Create new Recipe</button>
        </Link>
        <Link to='/'>
          <button className={style.button}>Welcome</button>
        </Link>    
        {/* </div> */}
        <Login className={style.login}/>
        </div>
      </nav>

    </header>
  );
};

export default NavBar;

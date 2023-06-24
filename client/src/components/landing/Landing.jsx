import { useNavigate } from "react-router-dom";
import style from './Landing.module.css';

const Landing = () => {
    
    const navigate = useNavigate();
    const toHome = () => {
      navigate('/home')
    };

    return(
        <div className={style.container}>
            <button className={style.button} onClick={toHome}>START</button>
            <h5 className={style.h5}>psst! It's not about lemons only!</h5>
        </div>
    );
}

export default Landing;
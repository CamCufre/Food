import React, { useState } from "react";
import { connect } from "react-redux";
import { didLog } from "../redux/actions";
import style from "./Login.module.css";
import firebase from "firebase/compat/app"; //firebase
import "firebase/compat/auth"; //firebase
import firebaseConfig from "./firebaseConfig"; //firebase
import image from '../assets/login-pic.png';

firebase.initializeApp(firebaseConfig); //firebase

const provider = new firebase.auth.GoogleAuthProvider(); //firebase

const Login = ({ logState, didLog }) => {
  const [logged, setLogged] = useState(logState);
  const [greetUser, setGreetUser] = useState('');
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  // Dentro de la función changeDidLog
  const changeDidLog = () => {
    if (logged === false) {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          const user = result.user;
          const username = user.displayName;
          setGreetUser(username)
          setLogged(true);
          didLog(true);
          setShowLogoutButton(true); // Mostrar el botón de logout al iniciar sesión
        })
        .catch((error) => {
          console.error("Error al iniciar sesión:", error);
        });
    } else {
      firebase
        .auth()
        .signOut()
        .then(() => {
          setLogged(false);
          didLog(false);
          setShowLogoutButton(false); // Ocultar el botón de logout al cerrar sesión
        })
        .catch((error) => {
          console.error("Error al cerrar sesión:", error);
        });
    }
  };

  return (
    <div className={style.container}>
      {!logged && (
        <button className={style.boton} onClick={changeDidLog}>
          Login
        </button>
      )}
      {logged && (
        <div className={style.container}>
          <img className={style.logicon} src={image} alt='' onClick={() => setShowLogoutButton(!showLogoutButton)} />
          {showLogoutButton && (<div className={style.panel}>
            <button className={style.logout}>
              Profile
            </button>
            <button className={style.logout}>
              My recipes
            </button>
            <button className={style.logout}>
              Favorites
            </button>
            <button onClick={changeDidLog} className={style.logout}>
              Logout
            </button>
            </div>
          )}
          <p className={style.greet}>{greetUser}</p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    logState: state.didLog,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    didLog: (value) => dispatch(didLog(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);


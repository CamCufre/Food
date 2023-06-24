import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./components/redux/store";
import { Provider } from "react-redux";

//Desde la version de react 18 la definicion de la raiz del proyecto se define asi, en vez de ReactDOM.render:

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);

reportWebVitals();
//Se importan los paquetes necesarios
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/* 
proporciona métodos específicos del DOM que pueden ser utilizados
en el nivel más alto de tu aplicación como una vía de escape del 
modelo de React si así lo necesitas. En otras palabras renderizamos
la página utilizando el App.js construido.
*/
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


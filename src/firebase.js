//Importar paquete de Firebase
import * as firebase from 'firebase';

//Configuración de Firbase para su respectiva conexión
const firebaseConfig = {
  apiKey: "AIzaSyD20LJcLhyTCj03R8R_I8gnvvSsUPtzfuk",
  authDomain: "crudreactfirebase-522bd.firebaseapp.com",
  projectId: "crudreactfirebase-522bd",
  storageBucket: "crudreactfirebase-522bd.appspot.com",
  messagingSenderId: "126989505068",
  appId: "1:126989505068:web:9522eff6d151f82dbdf789"
};

  //Inicializar Firebase
  var fireDB=firebase.initializeApp(firebaseConfig);

  //Exportar conexión para utilizar en App.js
  export default fireDB.database().ref();
//Se importan los paquetes necesarios
import React, { Component } from "react";
import "./App.css";
import firebase from "./firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

class App extends Component {

  //Son los valores renderizados. Con esto se puede cambiar lo que hay en pantalla.
  state = {
    data: [], //Se guarda toda la información
    addModal: false, //Para mostrar u ocultar el modal de insertar
    editModal: false, //Para mostrar u ocultar el modal de editar
    
    //Formulario de la información requerida
    form:{
      name: '',
      university: '',
      country: '',
      age: 0
    },
    id: 0 //id que asigna Firebase, entonces es necesario para realizar acciones de editar o eliminar
  };

  //Petición para obtener todos los usuarios
  requestGet = () => {
    //On value es para obtener todos los valores
    //Si hay usuarios se guardan en el estado pero si no hay entonces queda vacio
    firebase.child("users").on("value", (name) => {
      if (name.val() !== null) {
        this.setState({ ...this.state.data, data: name.val() });
      } else {
        this.setState({ data: [] });
      }
    });
  };

  //Petición para agregar usuarios
  requestPost=()=>{
    //push es para agregar usuarios utilizando el form
    firebase.child("users").push(this.state.form);
    //Cuando finalice cierra el modal
    this.setState({addModal: false});
  }

  //Petición para agregar usuarios
  requestPut=()=>{
    //buscar usuario por id y utiliza el form para cambiar sus valores
    firebase.child(`users/${this.state.id}`).set(this.state.form);
    //Cuando finalice cierra el modal
    this.setState({editModal: false});
  }

  requestDelete=()=>{
    //Primero pregunta si desea elminar al usuario, si la respuesta es sí lo elimina por id
    if(window.confirm(`Are you sure want to delete user ${this.state.form && this.state.form.name}?`))
    {
      firebase.child(`users/${this.state.id}`).remove();
    }
  }

  //Método para capturar lo que el usuario está escrbiendo
  handleChange=e=>{
    this.setState({form:{
      ...this.state.form,
      [e.target.name]: e.target.value //target: elemento que dispara un evento.
    }})
  }

  //Con este método toma la información del usuario seleccionado para poder realizar su respectiva acción (Editar o Eliminar)
  selectUser=async(name, id, action)=>{
    await this.setState({form: name, id: id});
    (action==="Edit")?this.setState({editModal: true}):this.requestDelete();
  }

  //Ciclo de vida para que se carguen los datos al iniciar 
  componentDidMount() {
    this.requestGet();
  }

  //se encarga de renderizar en el navegador el HTML correspondiente al componente.
  render() {
    /*
    - Object.keys(this.state.data).map funciona para recorrer data y re recorren cada una de las filas.
    - Note la diferenvia de className, esto es una diferencia de HTML.
    */
    return (
      <div className="App">
        <br />
        <h1>CRUD of Users with React.js and Firebase</h1>
        <br />
        <button className="btn btn-success" onClick={()=>this.setState({addModal: true})}>Add User</button>
        <br />
        <br />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>University</th>
              <th>Country</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.data).map(i=>{
              return <tr key={i}>
                <td>{this.state.data[i].name}</td>
                <td>{this.state.data[i].university}</td>
                <td>{this.state.data[i].country}</td>
                <td>{this.state.data[i].age}</td>
                <td>
                  <button className="btn btn-primary" onClick={()=>this.selectUser(this.state.data[i], i, 'Edit')}>Edit</button> {"   "}
                  <button className="btn btn-danger" onClick={()=>this.selectUser(this.state.data[i], i, 'Delete')}>Delete</button>
                </td>

              </tr>
            })}
          </tbody>
        </table>

      <Modal isOpen={this.state.addModal}>
      <ModalHeader>Add User</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Name: </label>
          <br />
          <input type="text" className="form-control" name="name" onChange={this.handleChange}/>
          <br />
          <label>Country: </label>
          <br />
          <input type="text" className="form-control" name="country" onChange={this.handleChange}/>
          <br />
          <label>University: </label>
          <br />
          <input type="text" className="form-control" name="university" onChange={this.handleChange}/>
          <br />
          <label>Age: </label>
          <br />
          <input type="text" className="form-control" name="age" onChange={this.handleChange}/>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>this.requestPost()}>Add</button>{"   "}
        <button className="btn btn-danger" onClick={()=>this.setState({addModal: false})}>Cancel</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={this.state.editModal}>
      <ModalHeader>Edit User</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Name: </label>
          <br />
          <input type="text" className="form-control" name="name" onChange={this.handleChange} value={this.state.form && this.state.form.name}/>
          <br />
          <label>Country: </label>
          <br />
          <input type="text" className="form-control" name="country" onChange={this.handleChange} value={this.state.form && this.state.form.country}/>
          <br />
          <label>University: </label>
          <br />
          <input type="text" className="form-control" name="university" onChange={this.handleChange} value={this.state.form && this.state.form.university}/>
          <br />
          <label>Age: </label>
          <br />
          <input type="text" className="form-control" name="age" onChange={this.handleChange} value={this.state.form && this.state.form.age}/>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>this.requestPut()}>Edit</button>{"   "}
        <button className="btn btn-danger" onClick={()=>this.setState({editModal: false})}>Cancel</button>
      </ModalFooter>
    </Modal>
      </div>
    );
  }
}

export default App;
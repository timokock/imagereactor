import React, { Component } from 'react';
import Buscador from './components/Buscador';
import Resultado from './components/Resultado';

class App extends Component {

  state = {
    termino : '',
    imagenes: [],
    pagina:''
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }

  paginaAnterior = () => {
    // Leer state de la pagina actual
    let pagina = this.state.pagina;
    // Si la pagina es 1 no it ahcía atrás
    if(pagina === 1) return null;
    // Sumar uno a la pagina actual
    pagina -= 1;
    // Agregar el cambio a lstate
    this.setState({
      pagina: pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });
  }

  paginaSiguiente = () => {
    // Leer state de la pagina actual
    let pagina = this.state.pagina;
    // Sumar uno a la pagina actual
    pagina += 1;
    // Agregar el cambio al state
    this.setState({
      pagina: pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });
  }

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=14446344-070b80153caee1b3187cb3d87&q=${termino}&per_page=30&page=${pagina}`;
    
    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({ imagenes: resultado.hits }));
  }

  datosBusqueda = (termino) => {
    this.setState({
      termino: termino,
      pagina: 1
    }, () => {
      this.consultarApi();
    })
  }
  render() {
      return (
      <div className="app container">
          <div className="jumbotron">
            <p className="lead text-center">Image React</p>
            <Buscador datosBusqueda={this.datosBusqueda} />
          </div>
          <div className="row justify-content-center">
              <Resultado imagenes={this.state.imagenes} paginaAnterior={this.paginaAnterior} paginaSiguiente={this.paginaSiguiente}/>
          </div>
      </div>
    );
  }

}

export default App;

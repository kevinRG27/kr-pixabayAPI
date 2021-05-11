import React,{useState, useEffect} from 'react';
import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes'

function App() {

  const [categoria, guardarCategoria] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(5);

  useEffect(() => {
    const consultarAPI = async () =>{
      if(categoria === '') return;

    const imagenesPorPagina = 30;
    const key = '21560831-26dbbaa3ebb32f9c2a7a3e81b' ;
    const url = `https://pixabay.com/api/?key=${key}&q=${categoria}&per_page=
                  ${imagenesPorPagina}&page=${paginaActual}`;

    const respuesta = await fetch(url);
    const resultado = await respuesta.json();

    guardarImagenes(resultado.hits);

    const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
    guardarTotalPaginas(calcularTotalPaginas);

    //Mover pantalla hacia arriba
    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.scrollIntoView({ behavior: 'smooth'})


    }
    consultarAPI();

  }, [categoria,paginaActual]);

  //funcion para paina Anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;

    if(nuevaPaginaActual === 0) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  //funcion para paina Siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;

    if(nuevaPaginaActual > totalPaginas) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className='container'>
      <div className='jumbotron'>
        <p className='lead text-center'>Buscador de Imágenes</p>

        <Formulario
          guardarCategoria = {guardarCategoria}
        />

        
      </div>

      <div className='row justify-content-center'>
        <ListadoImagenes 
          imagenes = {imagenes}
        />

        { (paginaActual === 1) ? null :
          <button
          type='button'
          className='bbtn btn-info mr-1'
          onClick={paginaAnterior}
        >&laquo; Anterior </button>
        }
        
        {(paginaActual === totalPaginas) ? null :
          <button
          type='button'
          className='bbtn btn-info mr-1'
          onClick={paginaSiguiente}
        >Siguiente &raquo;</button>
        }
      </div>
    </div>
  );
}

export default App;

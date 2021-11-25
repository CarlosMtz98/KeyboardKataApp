import './App.css';
import "jquery-color";
import {Route,Routes,Link,Outlet} from 'react-router-dom'
import React from 'react';
import KeyB from './components/Keyboard';
import Stats from './components/stats';
import Footer from './components/footer';
import Header from './components/header';

function Menu(){
  return(
    <div className="Menu">
      <nav>
        <span><Link to="/">Inicio</Link></span>
        <span><Link to="/practice">Practicar</Link></span>
        <span><Link to="/stats">Estadísticas</Link></span>
      </nav>
      {/*Para activar los links dentro de esta cosa
      pone activado el link deseado
      */}
      <Outlet/>
    </div>
  );
}


function Error404(){
  return(
    <div className="Error404">
      <h1>404 (Not Found)</h1>
      <Link to="/">Ir a la página principal</Link>
    </div>
  );
}



function App() {
  //console.log = console.warn = console.error = () => {};
  return (
    <div className="App">
      <div className="page-cont">
      <Header/>
      <Routes>
        <Route path="/" element={<Menu/>}></Route>
        <Route path="/practice" element={<KeyB usuario="2"/>}></Route>
        <Route path="/stats" element={<Stats usuario="619b97c07982c1940ae7a49c"/>}></Route>
        <Route path="*" element={<Error404/>}/>
      </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;

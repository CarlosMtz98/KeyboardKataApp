import tecLogo from "./../logo_itesm.png"
import {Link} from 'react-router-dom'
import React from 'react';

class Header extends React.Component{
  
    render(){
        return(
            <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                <img src={tecLogo} alt="logoTec" className="logo"/>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/practice">Practicar</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/stats">Estadísticas</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Iniciar Sesión</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Registrarme</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">Perfil</Link>
                        </li>
                    </ul>
                </div>  
            </nav>
        );
    }
}

export default Header;
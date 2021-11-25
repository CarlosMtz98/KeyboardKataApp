import React from 'react';
import tecLogo from "./../logo_itesm.png"

class Footer extends React.Component{

  render(){
    return(
      <div className="Stats container-fluid Footer">
        <div className="row">
            <div className="col-12">
            <img src={tecLogo} alt="logoTec" className="logo2x"/>
            <h5>
                Instituto Tecnológico y de Estudios Superiores de Monterrey<br/>
                Campus Estado de México<br/><br/>

                Desarrollo de Aplicaciones Web


            </h5>
            </div>
        </div>
      </div>
    );
  }
}

export default Footer;
import React from 'react';
import SessionCard from './../components/SessionCard';
import App from './../components/Chart2'

class Stats extends React.Component{
  constructor(){
    super();
    this.state={
      idUsuario      :   "619b97c07982c1940ae7a49c",
      nickname       :   "",
      numSesiones    :   0,
      sesiones       :   "",
      sesionesPrint  :   [],
      segundos       :   0,
      fecha          :   "",
      correctas      :   0,
      incorrectas    :   0,
      velocidad      :   0,
      velocidades    :   []
    }
    this.componentDidMount=this.componentDidMount.bind(this);
    this.getUserStats=this.getUserStats.bind(this);
  }


  componentDidMount(){
    this.getUserStats();
  }

  async getUserStats(){
    const res=await fetch('http://localhost:8081/player/getOne',{
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        id   :  this.props.usuario
      })
    })
    const data= await res.json();
    const vel=data.correct/data.seconds;
    var sesion="";
    var correctas=0;
    var velocidad=0;
    var velocidades=[];
    var segundos=0;
    for(var i=0;i<data.sessions.length;i++){
      sesion=JSON.parse(data.sessions[i]);
      correctas=sesion.correct;
      segundos=0;velocidad=0;
      for(var j=0;j<sesion.texts.length;j++){
        segundos+=sesion.texts[j].seconds;
      }
      velocidades[i]=60*(correctas/segundos);
    }
    this.setState({
      nickname      : data.nickname,
      sesiones      : data.sessions,
      correctas     : data.correct,
      incorrectas   : data.incorrect,
      segundos      : data.seconds,
      fecha         : data.date,
      velocidad     : vel,
      velocidades   : velocidades
    },()=>{
      this.muestraSesiones();
    })
  }


  muestraSesiones(){
    var sesion="";
    for(var i=0;i<this.state.sesiones.length;i++){
      sesion=JSON.parse(this.state.sesiones[i]);
    }
    this.setState({
      sesionesPrint: [...this.state.sesionesPrint,
      <SessionCard data={this.state.sesiones} nickname={this.state.nickname} key={"ses"+this.state.idUsuario}/>]
    })

  }

  /*Aquí es donde se envían las velocidades: <App/>*/
  render(){
    return(
      <div>
        <App velocidades={this.state.velocidades}/>
        <div className="Stats" key={this.state.idUsuario}>
            {this.state.sesionesPrint}
        </div>
      </div>
    );
  }

}

export default Stats;
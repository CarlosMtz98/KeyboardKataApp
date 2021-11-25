import React from 'react';
import { Button,Modal,Container, Row, Col } from 'react-bootstrap';

class SessionCard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        sesiones    : props.data,
        nickname    : props.nickname,
        cards       : [],
        show        : false,
        detalles    : []
    }
    this.segundosAtiempo=this.segundosAtiempo.bind(this);
    this.handleShow=this.handleShow.bind(this);
    this.handleClose=this.handleClose.bind(this);
  }

  handleShow(info){
    var detalles=[];
    var velocidad=0;
    for(var i=0;i<info.length;i++){
      var textoFormateado=info[i].text;
      if(info[i].seconds>0){
        velocidad=60*(info[i].correct/info[i].seconds);
      }else{
        velocidad=0;
      }
      
      var key="RowInfo"+i;
      detalles[i]=(
          <Row key={key} className="rowInfo">
          <Col xs={12} sm={12} md={4} lg={4}>
              <h4>{this.state.nickname}</h4>
              <span className="infoIz">Tipo</span><span className="infoD">{info[i].type}</span><br/>
              <span className="infoIz">Dificultad</span> <span className="infoD">{info[i].difficulty}</span><br/>
              <span className="infoIz">Correctas </span> <span className="infoD">{info[i].correct}</span><br/>
              <span className="infoIz">Incorrectas </span> <span className="infoD">{info[i].incorrect}</span><br/>
              <span className="infoIz">Velocidad </span> <span className="infoD">{velocidad.toLocaleString(undefined, {maximumFractionDigits:2})}</span><br/>
              <span className="infoIz">Tiempo </span> <span className="infoD">{this.segundosAtiempo(info[i].seconds)}</span><br/>
            </Col>
            <Col xs={12} sm={12} md={8} lg={8}>
              <h4>Texto:</h4>
              <span className="new-line" id="newLines"><pre>{textoFormateado}</pre></span>
            </Col>
          </Row>
      );
    }
    this.setState({
      show        : true,
      detalles    : [detalles]
    })
  }

  handleClose(){
    this.setState({
      show:false
    })
  }

  segundosAtiempo(sec){
    var hours   = Math.floor(sec / 3600); // get hours
    var minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    var seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds; // Return is HH : MM : SS
  }

  componentDidMount(){
    var segundos=0;
    var velocidad=0;
    var tiempo=0;
    const cards=this.state.sesiones.map((sesion,id)=>{
      // sesion=JSON.parse(sesion);
      sesion=JSON.parse(sesion);
      //console.log("Sesion: "+sesion.texts[0].text);
      
      segundos=0;
      for(var i=0;i<sesion.texts.length;i++){
        segundos+=sesion.texts[i].seconds;
      }
      velocidad=60*(sesion.correct/segundos);
      tiempo=this.segundosAtiempo(segundos);
      //console.log("Sesiones: "+sesion.texts)
      return(
        <tr key={"SesionRow"+id}>
          <td>{sesion.date}</td>
          <td>{sesion.correct}</td>
          <td>{sesion.incorrect}</td>
          <td>{tiempo}</td>
          <td>{velocidad.toLocaleString(undefined, {maximumFractionDigits:2})}</td>
          <td><Button variant="success" onClick={()=>this.handleShow(sesion.texts)}>Detalles</Button></td>
        </tr>
      );
    });
    this.setState({
      cards: [cards]
    },()=>{
      //console.log("imprimiendo sesiones print");
    })
  }

 




  render(){
    return(
      <div className="SessionCard container" key="SesCard">
        <div className="table-responsive" key="testres">
          <table className="table table-hover" key="tableK">
            <thead key="theadK">
              <tr>
                <th colSpan="5">Sesiones</th>
              </tr>
              <tr>
                <th>Fecha</th>
                <th>Correcto</th>
                <th>Incorrecto</th>
                <th>Tiempo total</th>
                <th>Letras Correctas/Minuto</th>
                <th></th>
              </tr>
            </thead>
            <tbody key="tbody">
              {this.state.cards}
            </tbody>
          </table>
        </div>

        <Modal show={this.state.show} onHide={this.handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>Detalles de la Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={12} md={12} sm={12} lg={12}>
                <Container>
                  {this.state.detalles}
                </Container>
              </Col>
            </Row>
          </Container>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
    </Modal>
    {/**/}


      </div>
    );
  }
}

export default SessionCard;
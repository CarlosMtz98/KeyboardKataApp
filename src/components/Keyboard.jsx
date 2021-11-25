import $ from "jquery";
import "jquery-color";
import React from 'react';
import Watch from './stopWatch';

class KeyB extends React.Component{
  //Cuando se pinta el componente se ejecuta esto:
  constructor(){
    super();
    this.state={
      idUsuario      :   "619b97c07982c1940ae7a49c",
      textoViejo     :   "",
      textoOriginal  :   "",
      textoJuego     :   "",
      textoForm      :   "",
      correctas      :   0,
      correctasT     :   0,
      incorrectas    :   0,
      incorrectasT   :   0,
      ndown          :   0,
      ite            :   0,
      runFlag        :   0,
      frases         :   []
    }
    this.componentDidMount=this.componentDidMount.bind(this);
    this.avanza=this.avanza.bind(this);
    this.cambiaText=this.cambiaText.bind(this);
    this.animaKey=this.animaKey.bind(this);
    this.animaKeyboard=this.animaKeyboard.bind(this);
    this.loadRandomText=this.loadRandomText.bind(this);
    this.startWatch=this.startWatch.bind(this);
    this.pauseWatch=this.pauseWatch.bind(this);
    this.resetWatch=this.resetWatch.bind(this);
    this.reiniciaHandler=this.reiniciaHandler.bind(this);
    this.guardaTiempo=this.guardaTiempo.bind(this);
    this.resetTime=this.resetTime.bind(this);
    this.resetButton=this.resetButton.bind(this);
    this.guardaSesion=this.guardaSesion.bind(this);
    this.cambiaFiltro=this.cambiaFiltro.bind(this);
  }

  startWatch(){
      $("#watchStart").click();
  }

  pauseWatch(){
    $("#watchPause").click();
  }

  resetTime(){
    $("#watchReset").click();
  }
 
  resetWatch(){
    $("#watchReset").click();
    //console.log("TOTAL:\n"+this.state.frases)
    this.loadRandomText(1);
    this.guardaTiempo();

  }

  resetButton(){
    $('#msgGuardar').empty().show().html("Sesión Guardada").delay(2500).fadeOut(300);
    $("#watchReset").click();
    //console.log("TOTAL:\n"+this.state.frases)
    this.guardaTiempo(1);
    //this.guardaSesion();
    this.loadRandomText(1);
  }

  cambiaFiltro(){
    this.guardaTiempo();
    $("#texta").val("");
    this.loadRandomText(0);
  }

  async guardaSesion(){
    const horas=1*$("#horas").val();
    const minutos=1*$("#minutos").val();
    var segundos=1*$("#segundos").val();
    var jFrase="";
    var nuevasFrases=[];
    segundos=segundos+minutos*60+horas*60*60;
    var vel=0;
    if(segundos===0){segundos=1}
    vel=60*(this.state.correctasT/segundos);
    /*console.log(
        "idUsuario: "+this.state.idUsuario+"\n",
        "correct: "+this.state.correct+"\n",
        "incorrect: "+this.state.incorrect+"\n",
        "seconds: "+segundos+"\n",
        "velocity:"+vel+"\n",
        "texts: "+this.state.frases
    );*/
    var fecha=new Date().toLocaleString("es-MX");

    //console.log("#Frases: "+this.state.frases.length);
    for(var i=0;i<this.state.frases.length;i++){
        //console.log("\n\n");
        //console.log(i+": "+this.state.frases[i])
        jFrase=JSON.parse(this.state.frases[i]);
        //console.log(i+": "+jFrase.text)
        //console.log(i+": "+jFrase.correct+"-"+jFrase.incorrect+"\n#Text; "+jFrase.text.length)
        if(jFrase.correct!==0 || jFrase.incorrect!==0){
            //console.log(i+" Guarda");
            nuevasFrases.push(jFrase);
        }
    }
    //console.log("Nuevas Frases Obj: "+nuevasFrases);
    //console.log("Nuevas Frases JSON: "+JSON.stringify(nuevasFrases));
    //console.log("Json o string: "+this.state.frases[0]);

    //"texts":  "["+this.state.frases+"]"
    const body=JSON.stringify({
        "idUsuario":  this.state.idUsuario,
        "date": fecha,
        "correct" :  this.state.correctasT,
        "incorrect":  this.state.incorrectasT,
        "seconds":  segundos,
        "velocity":  vel,
        "texts":  nuevasFrases

    });
    //console.log("Body: "+body);
    await fetch('http://localhost:8081/player/addSession',{
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body:body
    })
    //const data= await res.json();
    //console.log("Resultado AddSession: "+data.op);
  }



  guardaTiempo(sesion){
    const horas=1*$("#horas").val();
    const minutos=1*$("#minutos").val();
    var segundos=1*$("#segundos").val();
    var segundosA=0;
    var correctas=this.state.correctasT;
    var incorrectas=this.state.incorrectasT;
    var correctasT=0;
    var incorrectasT=0;
    segundos=segundos+minutos*60+horas*60*60;
    var num=this.state.frases.length;
    var vel=0;
    var eliminaUltimo=0;
    var frases=this.state.frases.map((frase,id)=>{
        //frase.replace('"', '\"');
        var j=JSON.parse(frase);
        j.text=j.text.replace(/"/g, '\"');
        //console.log("Frase: "+j.text);
        if(id<=num-2 && num>1){
            segundosA+=j.seconds;
            correctasT+=j.correct;
            incorrectasT+=j.incorrect;
        }
        if(id===num-1){
            var segundosDen=segundos-segundosA;
            if(segundosDen===0){segundosDen=1;}
            vel=60*((correctas-correctasT)/(segundosDen));
            j.seconds=segundos-segundosA;
            j.correct=correctas-correctasT;
            j.incorrect=incorrectas-incorrectasT;
            j.velocity=vel;
        }
        
        if(j.text.length===j.correct){
            return JSON.stringify(j);
        }else{
            eliminaUltimo=1;
            return JSON.stringify(j);
        }/**/
    });
    //console.log("Modificando: "+frases);
    this.setState({
        frases
    },()=>{
        if(sesion===1){
            this.guardaSesion();
        }
        //console.log("Modificando: "+this.state.frases);
        if(eliminaUltimo===1){
            //console.log("Ignora último");
        }
    })

  }



  reiniciaHandler(){
    //console.log("Reiniciando: ");
    this.resetWatch();
  }


  componentDidMount(){
    //console.log("Props: "+this.props.usuario)
    this.setState({
      textoJuego : ""
    },()=>{
      //console.log("textoJuego: "+this.state.textoJuego)
      this.avanza(0,0);
    })
    $('#texta').focus();
    $('#texta').focusout(function(){
        $('#texta').focus();
    });
    //this.loadRandomText(1);
    this.resetWatch();
    this.pauseWatch();
    this.resetTime();

    
  }


  async loadRandomText(reinicia){
    //console.log("Loading");
    this.pauseWatch();
    this.setState({ runFlag : 0 });
    $("#textoIte").html("");
    $("#texta").val("");
    const jType=$("#type").val();
    const res=await fetch('http://localhost:8081/content/getRandom',{
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        type   :  jType
      })
    })
    const data= await res.json();
    //console.log(data);
    const frase=JSON.stringify({
        id         : data._id,
        difficulty : data.difficulty,
        title      : data.title,
        seconds    : 0,
        velocity   : 0,
        text       : data.text,
        type       : data.type,
        language   : data.language,
        correct    : 0,
        incorrect  : 0
    })
    var jsonSave;
    if(reinicia===1){
        jsonSave={
            textoJuego : data.text,
            textoViejo     :   "",
            textoOriginal  :   "",
            textoForm      :   "",
            correctas      :   0,
            incorrectas    :   0,
            ndown          :   0,
            ite            :   0,
            frases:[frase]
        }
    }else{
        jsonSave={
            textoJuego : data.text,
            textoViejo     :   "",
            textoOriginal  :   "",
            textoForm      :   "",
            correctas      :   0,
            incorrectas    :   0,
            ndown          :   0,
            ite            :   0,
            frases:[...this.state.frases,frase]
        }
    }
    this.setState(jsonSave,()=>{
        //console.log("textoJuego: "+this.state.textoJuego)
        //console.log("Creando: "+this.state.frases);
        this.avanza(0,0);
        if(reinicia===1){
            this.setState({
                correctasT      :   0,
                incorrectasT    :   0,
            })
            $("#pCorrectos").html("0");
            $("#pIncorrectos").html("0");
        }
    })
    
  }

  handleKeyDown=(e)=>{
    var ndown=this.state.ndown;
    //var caps=e.getModifierState("CapsLock");
    //console.log("May: "+caps);
    //console.log("Key: "+e.keyCode);
    if (e.keyCode === 9){ //Tabulador
        e.preventDefault();
        $("#texta").val($("#texta").val()+"\t"); 
        //console.log("Tab");
    }else if (e.keyCode === 8){ //Backspace
        e.preventDefault();
        this.animaKeyboard(".nerase",'red');
        //console.log("Espacio");
    }else if (e.keyCode === 16){ //Shift
        e.preventDefault();
        this.animaKeyboard(".sh1",'#003399');
        this.animaKeyboard(".sh2",'#003399');
        //console.log("Shift");
    }else if(e.keyCode===20 || e.keyCode===18 || e.keyCode===93){
        //MAY
        this.animaKeyboard(".may",'#003399');
        //console.log("May");
    }else{
        ndown++;
        if(ndown>5){
            ndown=5;
        }
        this.setState({
          ndown : ndown
        },()=>{
          //console.log("Ndown Modificado: "+this.state.ndown)
        })
    }
  }

  avanza(lugares,rojo){
    //console.log("AVANZA");
    var temp=this.state.textoJuego;
    var malTab="bienTab";
    var malReturn="bienReturn";
    var textoForm="<span class='spanDone'>";
    var i=0;
    for(i=0;i<lugares;i++){
        if((i+1)===lugares && rojo===1){
            textoForm+="<span class='spanMal'>";
            if(temp[i]===" "){
              textoForm+="<span class='malSpace'>[SPACE]</span>";
            }else if(temp[i]==="\n"){
              textoForm+="<span class='malReturn'>[Enter]</span><br>";break;
            }else if(temp[i]==="<"){
              textoForm+="&lt";
            }else if(temp[i]===">"){
              textoForm+="&gt";
            }else{
              textoForm+=temp[i];
            }
            textoForm+="</span>";
            malTab="malTab";
            malReturn="malReturn";
        }else{
            if(temp[i]=="<"){
                textoForm+="&lt";
            }else if(temp[i]==">"){
                textoForm+="&gt";
            }else{
                textoForm+=temp[i];
            }
        }
        switch(temp[i]){
            case '\t':
                textoForm+="<span class='"+malTab+"'>[TAB]</span>";break;
            case '\n':
                textoForm+="<br>";break;
        }
    }
    textoForm+="</span>";
    //console.log(textoForm);  
    textoForm+="<span class='spanMis'>";
    //console.log("Temp: "+temp)
    for(i=lugares;i<temp.length;i++){
        if(temp[i]=="<"){
            textoForm+="&lt";
        }else if(temp[i]==">"){
            textoForm+="&gt";
        }else{
            textoForm+=temp[i];
        }
        switch(temp[i]){
            case '\t':
                textoForm+="<span class='iTab'>[TAB]</span>";break;
            /*case '\n':
                textoForm+="<span class='iReturn'>[Enter]</span><br>";break;
            */
            case '\n':
                textoForm+="<br>";break;
        }
    }
    textoForm+="</span>";
    //console.log(textoForm);
    $("#textoIte").html(textoForm);
  }








  async cambiaText(){    
    var runFlag=this.state.runFlag;
    var corriendo=$("#corriendo").val();
    if(runFlag==0 || corriendo=="0"){
        //console.log("Inicia reloj");
        this.startWatch();
        this.setState({
            runFlag : 1
        });
    }
    var pasa=1;
    var texto=$("#texta").val();
    //ESTADOS
    var textoViejo=this.state.textoViejo;
    var ndown=this.state.ndown;
    var textoOriginal=this.state.textoOriginal;
    var textoJuego=this.state.textoJuego;
    var textoForm=this.state.textoForm;
    var correctas=this.state.correctas;
    var correctasT=this.state.correctasT;
    var incorrectas=this.state.incorrectas;
    var incorrectasT=this.state.incorrectasT;
    var ite=this.state.ite;
    //console.log("cambiandoText:"+texto);

    if(texto!=textoViejo){
        textoViejo=texto;
          //$("#test").html(texto);
          var letra = texto.substr(texto.length - 1);
          var j=0;
          var it=0;
          if(ite>=ndown-1){
              for(var i=texto.length-1;i>=0 && j<ndown
              && ndown>=2;i--){
                  it=i;
                  switch(ndown){
                      case 2:
                          it=i;
                          break;
                      case 3:
                          it=i-1;
                          break;
                  }
                  //console.log("Intrf"+ndown +" "+texto[it]+" "+textoJuego[ite-j+1]);
                  if(texto[it]!=textoJuego[ite-j+1]){
                      pasa=0;
                  }
                  j++;
              }
          }else{
              pasa=0;
          }
          if((letra!=textoJuego[ite] && letra!="´") && ndown==1){
              pasa=0;
          }
          if(textoJuego[ite]=="\t" && pasa==1){
              ndown=1; 
          }
          //console.log("Pasa: "+pasa + letra);
          if(pasa==1){
              this.animaKey(letra,'#003399');//Azul Tec
              if(letra!="´"){
                //console.log(ndown);
                ite+=ndown; correctas+=ndown; correctasT+=ndown;
                this.avanza(correctas,0);
                $("#pCorrectos").html(correctasT);
              }
          }else{
              this.animaKey(letra,'red');
              incorrectas+=ndown; incorrectasT+=ndown;
              $("#pIncorrectos").html(incorrectasT);
              this.avanza(correctas+1,1);
          }
    }
    ndown=0;
    this.setState({
      textoViejo     :   textoViejo,
      textoOriginal  :   textoOriginal,
      textoJuego     :   textoJuego,
      textoForm      :   textoForm,
      correctas      :   correctas,
      incorrectas    :   incorrectas,
      correctasT     :   correctasT,
      incorrectasT   :   incorrectasT,
      ndown          :   ndown,
      ite            :   ite
    },()=>{
        if(ite==textoJuego.length){
            //console.log("VUELVE A CARGAR");
            this.guardaTiempo();
            $("#texta").val("");
            this.loadRandomText(0);
        }
    })
  }

  

  animaKeyboard(tecla,color){
    //console.log("KeyBoard "+tecla);
      $(tecla).animate(
          { backgroundColor: color },
          0,
          "swing",function(){
              $(tecla).animate({backgroundColor:'#FFFFFF'},200)
          }
      );
  }

  animaKey(keycode,color){
    //console.log("AnimaKey: "+keycode+" "+color);
      switch(keycode){
          case '\t':
              this.animaKeyboard(".tab",color);break;
          case "\n":
              this.animaKeyboard(".lenter",color);
              this.animaKeyboard(".lenter2",color);
              this.animaKeyboard(".lenter3",color);
              break;
          case 'º': case 'ª': case '\\':
              this.animaKeyboard(".grad",color);break;
          case '0': case '=': case '≠':
              this.animaKeyboard(".n0",color);break;
          case '1': case '!': case '|':
              this.animaKeyboard(".n1",color);break;
          case '2': case '"': case '@':
              this.animaKeyboard(".n2",color);break;
          case '3': case '·': case '#':
              this.animaKeyboard(".n3",color);break;
          case '4': case '$': case '¢':
              this.animaKeyboard(".n4",color);break;
          case '5': case '%': case '∞':
              this.animaKeyboard(".n5",color);break;
          case '6': case '&': case '¬':
              this.animaKeyboard(".n6",color);break;
          case '7': case '/': case '÷':
              this.animaKeyboard(".n7",color);break;
          case '8': case '(': 
              this.animaKeyboard(".n8",color);break;
          case '9': case ')': 
              this.animaKeyboard(".n9",color);break;
          case '?': case "'": 
              this.animaKeyboard(".npDown",color);break;
          case '¿': case '¡': 
              this.animaKeyboard(".npUp",color);break;

          case 'q': case 'Q':
            this.animaKeyboard(".lq",color);break;
          case 'w': case 'W':
            this.animaKeyboard(".lw",color);break;
          case 'e': case 'é': case 'E': case 'É':
            this.animaKeyboard(".le",color);break;
          case 'r': case 'R':
            this.animaKeyboard(".lr",color);break;
          case 't': case 'T':
            this.animaKeyboard(".lt",color);break;
          case 'y': case 'Y':
            this.animaKeyboard(".ly",color);break;
          case 'u': case 'ú': case 'U': case 'Ú':
            this.animaKeyboard(".lu",color);break;
          case 'i': case 'í': case 'I': case 'Í':
            this.animaKeyboard(".li",color);break;
          case 'o': case 'ó': case 'O': case 'Ó':
            this.animaKeyboard(".lo",color);break;
          case 'p': case 'P':
            this.animaKeyboard(".lp",color);break;
          case '`': case '^': case '[':
            this.animaKeyboard(".lainv",color);break;
          case '+': case '*': case ']':
            this.animaKeyboard(".last",color);break;


          case 'a': case 'á': case 'A': case 'Á':
            this.animaKeyboard(".la",color);break;
          case 's': case 'S':
            this.animaKeyboard(".ls",color);break;
          case 'd': case 'D':
            this.animaKeyboard(".ld",color);break;
          case 'f': case 'F':
            this.animaKeyboard(".lf",color);break;
          case 'g': case 'G':
            this.animaKeyboard(".lg",color);break;
          case 'h': case 'H':
            this.animaKeyboard(".lh",color);break;
          case 'j': case 'J':
            this.animaKeyboard(".lj",color);break;
          case 'k': case 'K':
            this.animaKeyboard(".lk",color);break;
          case 'l': case 'L':
            this.animaKeyboard(".ll",color);break;
          case 'ñ': case 'Ñ':
            this.animaKeyboard(".lñ",color);break;
          case '´': case '¨': case '{':
            this.animaKeyboard(".lllaa",color);break;
          case 'ç': case 'Ç': case '}':
            this.animaKeyboard(".lllac",color);break;
          
          case '<': case '>': case '≤':
            this.animaKeyboard(".lmm",color);break;
          case 'z': case 'Z':
            this.animaKeyboard(".lz",color);break;
          case 'x': case 'X':
            this.animaKeyboard(".lx",color);break;
          case 'c': case 'C':
            this.animaKeyboard(".lc",color);break;
          case 'v': case 'V':
            this.animaKeyboard(".lv",color);break;
          case 'b': case 'B':
            this.animaKeyboard(".lb",color);break;
          case 'n': case 'N':
            this.animaKeyboard(".ln",color);break;
          case 'm': case 'M':
            this.animaKeyboard(".lm",color);break;
          case ',': case ';':
            this.animaKeyboard(".lcoma",color);break;
          case '.': case ':':
            this.animaKeyboard(".lpunto",color);break;
          case '-': case '_':
            this.animaKeyboard(".lmenos",color);break;

          case " ":
            this.animaKeyboard(".esp",color);break;
          default:
            console.log("");

      }
  }


  render(){
    return(
      <div className="Juego">
        <div className="container formFilter">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 col-filter">
                    <label className="mb-0"><b>Tipo:</b></label>
                    <select className="form-control" id="type" name="type"
                    onChange={this.cambiaFiltro}>
                        <option value="Texto">Texto</option>
                        <option value="Python">Python</option>
                        <option value="C++">C++</option>
                        <option value="JAVA">JAVA</option>
                    </select>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 col-filter">
                <label className="mb-0"><b>Dificultad:</b></label>
                    <select className="form-control" id="diff" name="diff"
                    onChange={this.cambiaFiltro}>
                        <option value="1">Noob</option>
                        <option value="5">TurboMegaPro</option>
                    </select>
                </div>
            </div>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                    <Watch/>
                </div>
                <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5">
                    <button className="btn btn-success btnMTC btnMTChide" onClick={this.startWatch}>Comenzar</button>
                    <button className="btn btn-primary btnMTC" onClick={this.pauseWatch}>Pausa</button>
                    <button className="btn btn-primary btnMTC" onClick={this.resetButton}>Guardar Sesión</button>
                    <p className="indicacionesP">Teclea para continuar</p>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    
                    <div className="container-fluid mb-0">
                        <div className="row mt-0 mb-0">
                            <div className="col-6 colCorrecto">
                                <p className="mb-0">Correctos</p>
                                <p id="pCorrectos" className="pC mb-0">0</p>
                            </div>
                            <div className="col-6 colIncorrecto">
                                <p className="mb-0">Incorrectos</p>
                                <p id="pIncorrectos" className="pC mb-0">0</p>
                            </div>
                        </div>

                        <div className="row mb-0">
                            <div className="col-12 mb-0">
                                <input type="hidden" id="textoJuego"
                                value="" className="textoJuego" readOnly
                                />
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>

        <div className="container-fluid mt-0">

        <div className="row mb-3">
            <div className="col-12">
                <span id="msgGuardar" className="badge badge-success"></span>
                <center>
                    <div className="textoIte" id="textoIte"></div>
                </center>
            </div>
        </div>

        <div className="row mt-0 mb-0">
            <center>
                <div id="wrap-texta">
                    <textarea id="texta" onKeyUp={this.cambiaText}
                    onKeyDown={this.handleKeyDown}
                    rows="1"></textarea>
                    <div id="cubre"></div>
                </div>

                <div id="test"></div>
            </center>
        </div>

        <div className="row">
            <div className="col-12">
                
                <center>

                    
                    <div className="baseKey d-none d-md-block">
                        <div className="">
                            <div className="k k1 grad">º</div>
                            <div className="k k1 n1">1</div>
                            <div className="k k1 n2">2</div>
                            <div className="k k1 n3">3</div>
                            <div className="k k1 n4">4</div>
                            <div className="k k1 n5">5</div>
                            <div className="k k1 n6">6</div>
                            <div className="k k1 n7">7</div>
                            <div className="k k1 n8">8</div>
                            <div className="k k1 n9">9</div>
                            <div className="k k1 n0">0</div>
                            <div className="k k1 npDown">? '</div>
                            <div className="k k1 npUp">¿ ¡</div>
                            <div className="k k2 nerase">Erase</div>
                        </div>

                        <div className="fila">
                            <div className="k k3 tab">Tab</div>
                            <div className="k k1 lq">Q</div>
                            <div className="k k1 lw">W</div>
                            <div className="k k1 le">E</div>
                            <div className="k k1 lr">R</div>
                            <div className="k k1 lt">T</div>
                            <div className="k k1 ly">Y</div>
                            <div className="k k1 lu">U</div>
                            <div className="k k1 li">I</div>
                            <div className="k k1 lo">O</div>
                            <div className="k k1 lp">P</div>
                            <div className="k k1 lainv">` ^</div>
                            <div className="k k1 last">* +</div>
                            <div className="k k7 lenter">Enter</div>
                            <div className="k k9 lenter3"></div>
                            <div className="k k8 lenter2"></div>
                        </div>

                        <div className="fila">
                            <div className="k k4 may">May</div>
                            <div className="k k1 la">A</div>
                            <div className="k k1 ls">S</div>
                            <div className="k k1 ld">D</div>
                            <div className="k k1 lf">F</div>
                            <div className="k k1 lg">G</div>
                            <div className="k k1 lh">H</div>
                            <div className="k k1 lj">J</div>
                            <div className="k k1 lk">K</div>
                            <div className="k k1 ll">L</div>
                            <div className="k k1 lñ">Ñ</div>
                            <div className="k k1 lllaa">´ {"{"}</div>
                            <div className="k k1 lllac">Ç {"}"}</div>
                        </div>

                        <div className="fila">
                            <div className="k k5 sh1">Shift</div>
                            <div className="k k1 lmm">{"<>"}</div>
                            <div className="k k1 lz">Z</div>
                            <div className="k k1 lx">X</div>
                            <div className="k k1 lc">C</div>
                            <div className="k k1 lv">V</div>
                            <div className="k k1 lb">B</div>
                            <div className="k k1 ln">N</div>
                            <div className="k k1 lm">M</div>
                            <div className="k k1 lcoma">,</div>
                            <div className="k k1 lpunto">.</div>
                            <div className="k k1 lmenos">-</div>
                            <div className="k k6 sh2">Shift</div>
                        </div>

                        <center>
                            <div className="fila">
                                <div className="k k10 esp"></div>
                            </div>
                        </center>
                    </div>

                </center>
            </div>
        </div>
        </div>

        
        
        
      
      </div>
    );
  }
}

export default KeyB;
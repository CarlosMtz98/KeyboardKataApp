function mifuncion(){
    alert("en función archivo .js");
}

var textoViejo="";
var textoOriginal="";
var textoJuego="";
var textoForm="";
var correctas=0;
var incorrectas=0;
var ndown=0;
var ite=0; //Iterador del texto de juego

$(function() {
    /*textoJuego="?{}();=123\nHola esta es la Prime\n\tra prueba1.?\nEsta es otra fila";
    $('#texta').focus();
    $('#texta').focusout(function(){
        $('#texta').focus();
    });*/
    //avanza(0);
});

function animaKeyboard(tecla,color){
    /*$(tecla).animate(
        { backgroundColor: color },
        0,
        "swing",function(){
            $(tecla).animate({backgroundColor:'#FFFFFF'},200)
        }
    );
    */
}

function avanza(lugares,rojo){
    /*
    var temp=textoJuego;
    var malTab="bienTab";
    var malReturn="bienReturn";
    textoForm="<span class='spanDone'>";
    for(var i=0;i<lugares;i++){
        if((i+1)==lugares && rojo==1){
            textoForm+="<span class='spanMal'>";
            textoForm+=temp[i];
            textoForm+="</span>";
            malTab="malTab";
            malReturn="malReturn";
        }else{
            textoForm+=temp[i];
        }
        switch(temp[i]){
            case '\t':
                textoForm+="<span class='"+malTab+"'>[TAB]</span>";break;
            case '\n':
                textoForm+="<span class='"+malReturn+"'>[Enter]</span><br>";break;
        }

    }
    textoForm+="</span>";

    textoForm+="<span class='spanMis'>";
    for(i=lugares;i<temp.length;i++){
        textoForm+=temp[i];
        switch(temp[i]){
            case '\t':
                textoForm+="<span class='iTab'>[TAB]</span>";break;
            case '\n':
                textoForm+="<span class='iReturn'>[Enter]</span><br>";break;
        }
    }
    textoForm+="</span>";

    $("#textoIte").html(textoForm);
    */
}

function cambiaText(){
   /*var pasa=1;
   var texto=$("#texta").val();
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
                console.log("Intrf"+ndown +" "+texto[it]+" "+textoJuego[ite-j+1]);
                if(texto[it]!=textoJuego[ite-j+1]){
                    pasa=0;
                }
                j++;
            }
        }else{
            pasa=0;
        }
        if(letra!=textoJuego[ite]&&ndown==1){
            pasa=0;
        }
        if(textoJuego[ite]=="\t" && pasa==1){
            ndown=1; 
        }
        console.log("Pasa: "+pasa + letra);
        if(pasa==1){
            animaKey(letra,'#003399');//Azul Tec
            console.log(ndown);
            ite+=ndown; correctas+=ndown;
            avanza(correctas,0);
            $("#pCorrectos").html(correctas);
        }else{
            animaKey(letra,'red');
            incorrectas+=ndown;
            $("#pIncorrectos").html(incorrectas);
            avanza(correctas+1,1);
        }
   }
   ndown=0;
   */
}

function animaKey(keycode,color){
    /*
    switch(keycode){
        case '\t':
            animaKeyboard(".tab",color);break;
        case "\n":
            animaKeyboard(".lenter",color);
            animaKeyboard(".lenter2",color);
            animaKeyboard(".lenter3",color);
            break;
        case '0': case '=': case '≠':
            animaKeyboard(".n0",color);break;
        case '1': case '!': case '|':
            animaKeyboard(".n1",color);break;
        case '2': case '"': case '@':
            animaKeyboard(".n2",color);break;
        case '3': case '·': case '#':
            animaKeyboard(".n3",color);break;
        case '4': case '$': case '¢':
            animaKeyboard(".n4",color);break;
        case '5': case '%': case '∞':
            animaKeyboard(".n5",color);break;
        case '6': case '&': case '¬':
            animaKeyboard(".n6",color);break;
        case '7': case '/': case '÷':
            animaKeyboard(".n7",color);break;
        case '8': case '(': 
            animaKeyboard(".n8",color);break;
        case '9': case ')': 
            animaKeyboard(".n9",color);break;
        case '?': case "'": 
            animaKeyboard(".npDown",color);break;
        case '¿': case '¡': 
            animaKeyboard(".npUp",color);break;

        case 'q': case 'Q':
            animaKeyboard(".lq",color);break;
        case 'w': case 'W':
            animaKeyboard(".lw",color);break;
        case 'e': case 'é': case 'E': case 'É':
            animaKeyboard(".le",color);break;
        case 'r': case 'R':
            animaKeyboard(".lr",color);break;
        case 't': case 'T':
            animaKeyboard(".lt",color);break;
        case 'y': case 'Y':
            animaKeyboard(".ly",color);break;
        case 'u': case 'ú': case 'U': case 'Ú':
            animaKeyboard(".lu",color);break;
        case 'i': case 'í': case 'I': case 'Í':
            animaKeyboard(".li",color);break;
        case 'o': case 'ó': case 'O': case 'Ó':
            animaKeyboard(".lo",color);break;
        case 'p': case 'P':
            animaKeyboard(".lp",color);break;
        case '`': case '^': case '[':
            animaKeyboard(".lainv",color);break;
        case '+': case '*': case ']':
            animaKeyboard(".last",color);break;


        case 'a': case 'á': case 'A': case 'Á':
            animaKeyboard(".la",color);break;
        case 's': case 'S':
            animaKeyboard(".ls",color);break;
        case 'd': case 'D':
            animaKeyboard(".ld",color);break;
        case 'f': case 'F':
            animaKeyboard(".lf",color);break;
        case 'g': case 'G':
            animaKeyboard(".lg",color);break;
        case 'h': case 'H':
            animaKeyboard(".lh",color);break;
        case 'j': case 'J':
            animaKeyboard(".lj",color);break;
        case 'k': case 'K':
            animaKeyboard(".lk",color);break;
        case 'l': case 'L':
            animaKeyboard(".ll",color);break;
        case 'ñ': case 'Ñ':
            animaKeyboard(".lñ",color);break;
        case '´': case '¨': case '{':
            animaKeyboard(".lllaa",color);break;
        case 'ç': case 'Ç': case '}':
            animaKeyboard(".lllac",color);break;
        
        case '<': case '>': case '≤':
            animaKeyboard(".lmm",color);break;
        case 'z': case 'Z':
            animaKeyboard(".lz",color);break;
        case 'x': case 'X':
            animaKeyboard(".lx",color);break;
        case 'c': case 'C':
            animaKeyboard(".lc",color);break;
        case 'v': case 'V':
            animaKeyboard(".lv",color);break;
        case 'b': case 'B':
            animaKeyboard(".lb",color);break;
        case 'n': case 'N':
            animaKeyboard(".ln",color);break;
        case 'm': case 'M':
            animaKeyboard(".lm",color);break;
        case ',': case ';':
            animaKeyboard(".lcoma",color);break;
        case '.': case ':':
            animaKeyboard(".lpunto",color);break;
        case '-': case '_':
            animaKeyboard(".lmenos",color);break;

        case " ":
            animaKeyboard(".esp",color);break;

    }
    */
}

$('#texta').on('keydown', function(e){
    /*//alert(e.keyCode);
     if (e.keyCode == 9){ //Tabulador
        e.preventDefault();
        $("#texta").val($("#texta").val()+"\t"); 
     }else if (e.keyCode == 8){ //Backspace
        e.preventDefault();
        animaKeyboard(".nerase",'red');
     }else if (e.keyCode == 16){ //Shift
        e.preventDefault();
     }else if(e.keyCode==20 || e.keyCode==18 || e.keyCode==93){
         //MAY
     }else{
        ndown++;
        if(ndown>5){
            ndown=5;
        }
     }*/
});


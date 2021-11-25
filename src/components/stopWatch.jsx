import React from 'react';
import { useStopwatch } from 'react-timer-hook';

function Watch() {
  const {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });



  return (
    <div style={{textAlign: 'center',marginTop:'0px'}}>
      <input type="hidden" id="horas" value={hours} readOnly/>
      <input type="hidden" id="minutos" value={minutes} readOnly/>
      <input type="hidden" id="segundos" value={seconds} readOnly/>
      <input type="hidden" id="corriendo" value={isRunning ? '1' : '0'} readOnly/>
      <div style={{fontSize: '28px',color:'#003399',marginTop:'0px'}}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p className={isRunning ? 'corriendoW' : 'pausaW'}>{isRunning ? 'Corriendo' : 'Pausa'}</p>
      <div id="watchStart" className="btnInvisible" onClick={start}>Iniciar</div>
      <div id="watchPause" className="btnInvisible" onClick={pause}>Pausar</div>
      <div id="watchReset" className="btnInvisible" onClick={() => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 0);
        reset(time,false)
      }}>Restart</div>
    </div>
  );
}

export default function App(props) {
  return (
    <div>
      <Watch/>
    </div>
  );
}



/*
<div style={{textAlign: 'center'}}>
      <h1>react-timer-hook</h1>
      <p>Stopwatch Demo</p>
      <div style={{fontSize: '20px'}}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? 'Running' : 'Not running'}</p>
      <div id="watchStart" className="btnInvisible" onClick={start}>Iniciar</div>
      <div id="watchPause" className="btnInvisible" onClick={pause}>Pausar</div>
      <div id="watchReset" className="btnInvisible" onClick={() => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 0);
        reset(time,false)
      }}>Restart</div>
    </div>
*/
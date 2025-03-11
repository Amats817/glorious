import React, { useEffect, useState, useRef } from 'react';
import GSunCoin from './GSunCoin';
import './main.css';

const Main = () => {
  const [showNeonAlert, setShowNeonAlert] = useState(true);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const clickAudioRef = useRef(null);
  const neonButtonRef = useRef(null);

  useEffect(() => {
    const handleNeonClick = () => {
      clickAudioRef.current.volume = 0.3;
      clickAudioRef.current.play().catch(console.error);
    };

    const neonButtons = document.querySelectorAll('.neon-button, #neon-button');
    
    neonButtons.forEach(button => {
      button.addEventListener('click', handleNeonClick);
    });

    return () => {
      neonButtons.forEach(button => {
        button.removeEventListener('click', handleNeonClick);
      });
    };
  }, []);

  useEffect(() => {
    const playMedia = () => {
      setShowNeonAlert(false);
      audioRef.current.currentTime = 0;
      videoRef.current.currentTime = 0;

      Promise.all([audioRef.current.play(), videoRef.current.play()])
        .then(() => {
          sessionStorage.setItem('audioStarted', 'true');
        })
        .catch(console.error);
    };

    if (sessionStorage.getItem('audioStarted')) {
      playMedia();
    }

    const button = neonButtonRef.current;
    button.addEventListener('click', playMedia);

    return () => {
      button.removeEventListener('click', playMedia);
    };
  }, []);

  return (
 <div>
      {showNeonAlert && (
        <div className="neon-alert">
          <p>ARE YOU READY TO BRIDGE?</p>
          <button ref={neonButtonRef} id="neon-button">
            YES BABY
          </button>
        </div>
      )}

      <video 
        ref={videoRef}
        id="video-background" 
        autoPlay 
        muted 
        loop
      >
        <source 
          src={`${process.env.PUBLIC_URL}/assets/background.mp4`} 
          type="video/mp4" 
        />
      </video>

      <audio ref={audioRef} id="audio-loop" loop>
        <source 
          src={`${process.env.PUBLIC_URL}/assets/loop.mp3`} 
          type="audio/mpeg" 
        />
      </audio>

      <audio ref={clickAudioRef}>
        <source 
          src={`${process.env.PUBLIC_URL}/assets/jackpot.mp3`} 
          type="audio/mpeg" 
        />
      </audio>

      <div className="container">
        <h1 className="glitch-title">$GSUN – SOLAR POWERED COIN</h1>
        
        <div className="panel">
          <GSunCoin
            src={`${process.env.PUBLIC_URL}/assets/spinning-gsun.webm`} 
            width="20%"
          />
          <p>
            🔆 PROOF-OF-SUN (POSUN) – YOU WANNA STAKE? STEP OUTSIDE DUMBASS.
            <br /><br />
            ⚛️ NEUTRINO-BASED VALIDATION – WE ARE LITERALLY HARVESTING UNLIMITED ENERGY.
            <br /><br />
            🔥 SELF-BURNING MECHANISM – EVERY TRANSACTION? A FRACTION GETS VAPORIZED. SUPPLY GOES DOWN, PRICE GOES UP. SIMPLE MATH.
            <br /><br />
            💎 QUANTUM-RESISTANT BRIDGING – YOUR RETARDED GRANDKIDS WILL BE USING $GSUN TO BUY SPACESHIPS WHILE YOU’RE STILL STRUGGLING TO PAY OFF THAT HOOKER FROM LAST FRIDAY.
          </p>
          <button className="neon-button">SHOW ME YOUR WALLET!!</button>
          <button className="neon-button">AHHH YEAH BABY!! I'M FINNA BRIDGE!!</button>

          <h1>DEVS ARE DOXXED IN TELEGRAM 🔥🔥</h1> 
        </div>
      </div>
    </div>
  );
};

export default Main;
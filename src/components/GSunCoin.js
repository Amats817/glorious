  import { useEffect, useRef } from "react";

const TransparentVideo = ({ src, width }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const clickCoin = () => {
    let playbackRate = 7.0;
    const video = videoRef.current;
    video.playbackRate = playbackRate;

    const decayRate = 0.8; 
    const decayInterval = 200;

    const decayPlaybackRate = () => {
      if (playbackRate > 1.0) {
        playbackRate *= decayRate;
        video.playbackRate = playbackRate;
        setTimeout(decayPlaybackRate, decayInterval);
      } else {
        video.playbackRate = 1.0;
      }
    };

    setTimeout(decayPlaybackRate, decayInterval);
  };

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    contextRef.current = context;

    const preventPause = () => {
      if (video.paused) {
        video.play();
      }
    };

    const handleFrame = () => {
      if (video && canvas) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const frame = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = frame.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]; 
          const g = data[i + 1];
          const b = data[i + 2];

          if (r < 100 && g > 100 && b < 100) {
            data[i + 3] = 0;
          }

          const avg = (r + g + b) / 3;
          data[i] = avg;
          data[i + 1] = avg;
          data[i + 2] = avg;
        }

        context.putImageData(frame, 0, 0);
      }

      requestAnimationFrame(handleFrame);
    };

    video.addEventListener("pause", preventPause);

    canvas.addEventListener("click", clickCoin);

    handleFrame();

    return () => {
      video.removeEventListener("pause", preventPause);
      canvas.removeEventListener("click", clickCoin);
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: width,
          height: "auto",
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          opacity: 0
        }}
      />
      <canvas
        ref={canvasRef}
        width="100%"
        height="100%"
        style={{
          pointerEvents: "auto",
        }}
      />
    </>
  );
};

export default TransparentVideo;

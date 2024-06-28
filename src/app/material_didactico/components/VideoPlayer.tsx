import { useCallback, useRef } from "react";

interface VideoPlayerProps {
    videoPath: string;
  }
  
  const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoPath }) => {
    const playerRef = useRef<HTMLVideoElement>(null);
  
    const toggleFullScreen = useCallback(() => {
      if (!document.fullscreenElement) {
        playerRef.current?.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }, []);
  
    return (
      <div className="ml-72 mt-14 mr-4 mb-1 relative max-h-[80vh] h-[80vh]">
        <video
          ref={playerRef}
          className="w-full h-full"
          controls
          src={videoPath}
        >
          Tu navegador no soporta el elemento de video.
        </video>
        <button
          onClick={toggleFullScreen}
          className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full 
          hover:bg-opacity-75 transition-opacity"
        >
          Pantalla completa
        </button>
      </div>
    );
  };
  
  export default VideoPlayer;
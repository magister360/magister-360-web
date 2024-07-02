import { useCallback, useRef, useState } from "react";
import { fetchOpenVideo } from "../controller/MaterialDidacticoController";

interface VideoPlayerProps {
  videoPath: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoPath }) => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const playerRef = useRef<HTMLVideoElement>(null);
  const openVideo = async (videoPath: string) => {
    const url = await fetchOpenVideo(videoPath);
    setVideoUrl(url)
    return url;
  };
  openVideo(videoPath);

  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  return (
    <div className="ml-72 mt-14 mr-4 mb-1 relative max-h-[80vh] h-[80vh]">
      <video ref={playerRef} className="w-full h-full" controls src={videoUrl}>
        Tu navegador no soporta el elemento de video.
      </video>
      <button
        onClick={toggleFullScreen}
        className="absolute bottom-10 right-4 mb-10 bg-black bg-opacity-50 text-white p-2 rounded-full 
          hover:bg-opacity-75 transition-opacity"
      >
        Pantalla completa
      </button>
    </div>
  );
};

export default VideoPlayer;

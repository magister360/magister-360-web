"use client";

import React, { useRef, useCallback } from "react";

interface YouTubePlayerProps {
  videoId: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId }) => {
  const playerRef = useRef<HTMLDivElement>(null);

  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&controls=1&playlist=${videoId}`;

  return (
    <div
      ref={playerRef}
      className=" mt-2 mr-4 mb-1 relative max-h-[80vh] h-[80vh]"
    >
      <iframe
        title="Videos de youtube"
        className="w-full h-full"
        src={embedUrl}
        allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <button
        onClick={toggleFullScreen}
        className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full 
        hover:bg-opacity-75 transition-opacity"
      ></button>
    </div>
  );
};

export default YouTubePlayer;

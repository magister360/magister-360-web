
import React, { useState, useRef, useCallback, useEffect } from "react";
import { fetchOpenPdf, fetchOpenWord } from "../controller/MaterialDidacticoController";
interface WordViewerProps {
    wordPath: string;
  }
  
  const WordViewer: React.FC<WordViewerProps> = ({ wordPath }) => {
    const [wordUrl, setWordUrl] = useState<string>("");
    const containerRef = useRef<HTMLDivElement>(null);
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  
    const openWord = async (wordPath: string) => {
      const url = await fetchOpenWord(wordPath);
      setWordUrl(url);
      return url;
    };
  
    useEffect(() => {
      openWord(wordPath);
    }, [wordPath]);
  
    const enterFullScreen = () => {
      containerRef.current?.requestFullscreen();
      setIsFullScreen(true);
    };
  
    const exitFullScreen = () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      setIsFullScreen(false);
    };
  
    const toggleFullScreen = () => {
      if (isFullScreen) {
        exitFullScreen();
      } else {
        enterFullScreen();
      }
    };
  
    useEffect(() => {
      const handleFullScreenChange = () => {
        if (!document.fullscreenElement) {
          setIsFullScreen(false);
        }
      };
  
      document.addEventListener("fullscreenchange", handleFullScreenChange);
      return () => {
        document.removeEventListener("fullscreenchange", handleFullScreenChange);
      };
    }, []);
  
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isFullScreen) {
          exitFullScreen();
        }
      };
  
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isFullScreen]);
  
    return (
      <div 
        ref={containerRef} 
        className={`relative ${isFullScreen ? 'fixed inset-0 z-50' : 'ml-72 mt-14 mr-4 mb-1 h-[80vh]'}`}
      >
        <iframe
          src={wordUrl}
          className="w-full h-full"
          title="Word Viewer"
        >
          Tu navegador no soporta la visualización de documentos Word.
        </iframe>
        <button
          onClick={toggleFullScreen}
          className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full 
            hover:bg-opacity-75 transition-opacity"
        >
          {isFullScreen ? "Salir de pantalla completa" : "Pantalla completa"}
        </button>
      </div>
    );
  };
  
  export default WordViewer;
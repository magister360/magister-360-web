"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';



const Paint: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(5);
  const [eraserWidth, setEraserWidth] = useState(20);
  const [showPalette, setShowPalette] = useState(false);
  const [fontSize, setFontSize] = useState(24);
  const [isErasing, setIsErasing] = useState(false);
  const [eraserPosition, setEraserPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = isErasing ? eraserWidth : lineWidth;
      }
    }
  }, [lineWidth, eraserWidth, isErasing]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (isErasing) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, eraserWidth / 2, 0, Math.PI * 2);
        ctx.fill();
        setEraserPosition({ x, y });
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
      }
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const wrapText = (context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const words = text.split(' ');
    let line = '';
    let lines = [];

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        lines.push(line);
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    for (let i = 0; i < lines.length; i++) {
      context.fillText(lines[i], x, y);
      y += lineHeight;
    }
  };

  const pasteText = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (ctx && canvas) {
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        
        const maxWidth = canvas.width * 0.9;
        const lineHeight = fontSize * 1.2;
        const startY = Math.min(canvas.height * 0.1 + fontSize, canvas.height * 0.2);
        
        wrapText(ctx, text, canvas.width / 2, startY, maxWidth, lineHeight);
      }
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  return (
    <div className="mt-14 ml-72 flex">
      <div className="flex-grow relative">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={(e) => {
            draw(e);
            if (isErasing) {
              const rect = canvasRef.current?.getBoundingClientRect();
              if (rect) {
                setEraserPosition({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top
                });
              }
            }
          }}
          onMouseLeave={stopDrawing}
          className="border border-gray-300 rounded-lg cursor-crosshair"
        />
        {isErasing && (
          <motion.div
            className="absolute border-2 border-gray-500 rounded-full pointer-events-none"
            style={{
              width: eraserWidth,
              height: eraserWidth,
              x: eraserPosition.x - eraserWidth / 2,
              y: eraserPosition.y - eraserWidth / 2,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.1 }}
          />
        )}
        <button
          onClick={() => setShowPalette(!showPalette)}
          className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded"
        >
          {showPalette ? 'Ocultar' : 'Mostrar'} paleta
        </button>
      </div>
      <motion.div 
        className="w-40 ml-4 p-4 bg-gray-100 rounded-lg"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: showPalette ? 160 : 0, opacity: showPalette ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-lg font-bold mb-4">Paleta</h2>
        <div className="space-y-4">
          <div className="flex justify-around">
            <button
              onClick={() => {
                setIsErasing(false);
                setLineWidth(5); 
              }}
              className={`p-2 rounded ${!isErasing ? 'bg-blue-500' : 'bg-gray-300'}`}
            >
              <Image src="/pen.svg" alt="Plumón" width={24} height={24} />
            </button>
            <button
              onClick={() => {
                setIsErasing(true);
                setEraserWidth(20); // Establecer un grosor más ancho para el borrador
              }}
              className={`p-2 rounded ${isErasing ? 'bg-blue-500' : 'bg-gray-300'}`}
            >
              <Image src="/eraser.svg" alt="Borrador" width={24} height={24} />
            </button>
          </div>
          <div>
            <label htmlFor="colorPicker" className="block mb-2">Color:</label>
            <input
              id="colorPicker"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-10 rounded"
            />
          </div>
          <div>
            <label htmlFor="widthSlider" className="block mb-2">
              {isErasing ? 'Grosor del borrador:' : 'Grosor del plumón:'}
            </label>
            <motion.input
              id="widthSlider"
              type="range"
              min="1"
              max={isErasing ? "50" : "20"}
              value={isErasing ? eraserWidth : lineWidth}
              onChange={(e) => isErasing ? setEraserWidth(Number(e.target.value)) : setLineWidth(Number(e.target.value))}
              className="w-full"
              whileTap={{ scale: 1.1 }}
            />
            <motion.span 
              className="block text-center mt-1"
              key={isErasing ? eraserWidth : lineWidth}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {isErasing ? eraserWidth : lineWidth}px
            </motion.span>
          </div>
          <div>
            <label htmlFor="fontSize" className="block mb-2">Tamaño de fuente:</label>
            <motion.input
              id="fontSize"
              type="range"
              min="12"
              max="72"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full"
              whileTap={{ scale: 1.1 }}
            />
            <motion.span 
              className="block text-center mt-1"
              key={fontSize}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {fontSize}px
            </motion.span>
          </div>
          <button
            onClick={clearCanvas}
            className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Limpiar
          </button>
          <button
            onClick={pasteText}
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Pegar texto
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Paint;
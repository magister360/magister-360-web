export const DocumentTypeValues = {
  PROGRAMA_ANALITICO: { type: "Programa_A", icon: "/youtube.jpg",folderName:"Programa analitico" },
  CRONOGRAMAS: { type: "Cronogramas", icon: "/youtube.jpg" ,folderName:"Cronogramas"},
  PLANEACION_DIDACTICA: { type: "Planeacion_didactica", icon: "/youtube.jpg" ,folderName:"Planeacion didactica"},
  PROYECTOS: { type: "Proyectos", icon: "/youtube.jpg",folderName:"Proyectos" },
  EVALUACION_FORMATIVA: { type: "Evaluacion_formativa", icon: "/youtube.jpg" ,folderName:"Evaluacion formativa"},
  YOUTUBE: { type: "Youtube", icon: "/youtube.jpg" },
  VIDEO: { type: "Video", icon: "/video.jpg" },
  DIAPOSITIVAS: { type: "Diapositivas", icon: "/diapositivas.png" },
  PDF: { type: "Pdf", icon: "/pdf.png" },
  WORD: { type: "Word", icon: "/word.png" },
  DOCUMENT: { type: "Document", icon: "/document.png" },
  
} as const;

export const getDocuemntTypeValues = (): string[] => {
  const values = [
    DocumentTypeValues.YOUTUBE.type
 
  ];
  return values;
};

export const DocumentTypeValues = {
  PROGRAMA_ANALITICO: { type: "Programa_A", icon: "/word.png",folderName:"Programa analitico" },
  CRONOGRAMAS: { type: "Cronogramas", icon: "/word.png" ,folderName:"Cronogramas"},
  PLANEACION_DIDACTICA: { type: "Planeacion_didactica", icon: "/word.png" ,folderName:"Planeacion didactica"},
  PROYECTOS: { type: "Proyectos", icon: "/word.png",folderName:"Proyectos" },
  EVALUACION_FORMATIVA: { type: "Evaluacion_formativa", icon: "/word.png" ,folderName:"Evaluacion formativa"},
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

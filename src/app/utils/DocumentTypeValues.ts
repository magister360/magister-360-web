export const DocumentTypeValues = {
  YOUTUBE: { type: "Youtube", icon: "/youtube.jpg" },
  VIDEO: { type: "Video", icon: "/video.jpg" },
  DIAPOSITIVAS: { type: "Diapositivas", icon: "/diapositivas.png" },
  PDF: { type: "Pdf", icon: "/pdf.png" },
  WORD: { type: "Word", icon: "/word.png" },
  DOCUMENT: { type: "Document", icon: "/document.png" },
} as const;

export const getDocuemntTypeValues = (): string[] => {
  const values = [
    DocumentTypeValues.YOUTUBE.type,
    DocumentTypeValues.VIDEO.type,
    DocumentTypeValues.DIAPOSITIVAS.type,
    DocumentTypeValues.PDF.type,
    DocumentTypeValues.WORD.type,
  ];
  return values;
};

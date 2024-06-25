import { Dispatch, SetStateAction, useEffect } from "react";

type DocumentsHookProps = {
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  TOTAL_VIDEOS: number;
  slidesLength: number;
};

export const DocumentsHook = ({
 
  setCurrentIndex,
  TOTAL_VIDEOS,
  slidesLength,
}: DocumentsHookProps) => {
  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex: number) => (prevIndex + 1) % (slidesLength - (TOTAL_VIDEOS - 1))
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex: number) =>
        (prevIndex - 1 + (slidesLength - (TOTAL_VIDEOS - 1))) %
        (slidesLength - (TOTAL_VIDEOS - 1))
    );
  };

  useEffect(() => {
    const containers = document.querySelectorAll(".container-documents");

    containers.forEach((container) => {
      container.addEventListener("mouseenter", () => {
        containers.forEach((c) => {
          if (c !== container) {
            c.classList.add("fade");
          }
        });
      });

      container.addEventListener("mouseleave", () => {
        containers.forEach((c) => {
          c.classList.remove("fade");
        });
      });
    });

    // Limpieza
    return () => {
      containers.forEach((container) => {
        container.removeEventListener("mouseenter", () => {});
        container.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  return { nextSlide, prevSlide };
};

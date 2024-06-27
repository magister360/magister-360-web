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
    const containers = document.querySelectorAll("#youtube-carousel .container-documents");

    const handleMouseEnter = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      containers.forEach((c) => {
        if (c !== target) {
          c.classList.add("fade");
        }
      });
    };

    const handleMouseLeave = () => {
      containers.forEach((c) => {
        c.classList.remove("fade");
      });
    };

    containers.forEach((container) => {
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    });

    // Limpieza
    return () => {
      containers.forEach((container) => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [slidesLength]);

  return { nextSlide, prevSlide };
};

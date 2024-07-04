import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Student {
  id: number;
  name: string;
}

interface StudentCarouselProps {
  students: Student[];
  interval?: number;
}

const StudentCarousel: React.FC<StudentCarouselProps> = ({ students, interval = 1000 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRandom, setIsRandom] = useState(false);

  const toggleCarousel = () => {
    setIsOpen(!isOpen);
    setIsRandom(false);
  };

  const moveCarousel = useCallback(() => {
    if (!isRandom) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % students.length);
    }
  }, [isRandom, students.length]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && !isRandom) {
      timer = setInterval(moveCarousel, interval);
    }
    return () => clearInterval(timer);
  }, [isOpen, isRandom, interval, moveCarousel]);

  const showRandomStudent = () => {
    const randomIndex = Math.floor(Math.random() * students.length);
    setCurrentIndex(randomIndex);
    setIsRandom(true);
  };

  return (
    <>
      <button
        onClick={toggleCarousel}
        className="fixed top-16 left-72 z-20 px-4 py-2 bg-blue-500 text-white rounded
         hover:bg-blue-600"
      >
        {isOpen ? 'Aceptar' : 'Alumno aleatorio'}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-4 text-center">Carrusel de Estudiantes</h2>
              <div className="relative w-[800px] h-32 overflow-hidden">
                {isRandom ? (
                  <motion.div
                    key={students[currentIndex].id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg"
                  >
                    <span className="text-2xl font-bold text-center">{students[currentIndex].name}</span>
                  </motion.div>
                ) : (
                  <div 
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 200}px)` }}
                  >
                    {students.map((student, index) => (
                      <motion.div
                        key={student.id}
                        className="w-[200px] h-32 flex-shrink-0 bg-gray-200 flex items-center justify-center mx-2 rounded-lg"
                        style={{
                          opacity: 1 - Math.abs(index - currentIndex) * 0.2,
                          scale: 1 - Math.abs(index - currentIndex) * 0.05,
                        }}
                      >
                        <span className="text-xl font-bold text-center">{student.name}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
                {!isRandom && (
                  <>
                    <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
                  </>
                )}
              </div>
              <button
                onClick={showRandomStudent}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full"
              >
                Alumno Aleatorio
              </button>
              {isRandom && (
                <button
                  onClick={() => setIsRandom(false)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
                >
                  Volver al Carrusel
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StudentCarousel;
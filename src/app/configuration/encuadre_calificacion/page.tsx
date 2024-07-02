export default function EncuadreCalificacion() {
  return (
    <>
      <label
        className="mt-14 ml-72 block text-gray-700 dark:text-gray-200 font-bold text-xl mb-2"
        htmlFor="lbl-select-grado-grupo"
      >
        Encuadre calificación
      </label>

      <div className="mt-2 ml-72">
        <div
          className="rounded-lg shadow  
                        sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]  p-5"
        >
          <div>
            <label
              htmlFor="lbl-grado"
              className="block mb-2 text-sm font-medium text-gray-900
                        dark:text-white"
            >
              Grado
            </label>
            <select
              id="select-grado"
              className="block w-full p-2 mb-2 text-sm text-gray-900 
                         border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
                        focus:border-blue-500 dark:bg-[#1a2c32] dark:border-gray-600
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                        dark:focus:border-blue-500 "
            ></select>
          </div>

          <div>
            <label
              htmlFor="small"
              className="block mb-2 text-sm font-medium text-gray-900
                            dark:text-white"
            >
              Grupo
            </label>
            <select
              id="select-grupo"
              className="block w-full p-2 mb-2 text-sm text-gray-900 
                            border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
                            focus:border-blue-500 dark:bg-[#1a2c32] dark:border-gray-600
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                            dark:focus:border-blue-500 "
            ></select>
          </div>

          <div>
            <label
              htmlFor="small"
              className="block mb-2 text-sm font-medium text-gray-900
                    dark:text-white"
            >
              Materia
            </label>
            <select
              id="select-materia"
              className="block w-full p-2  text-sm text-gray-900 
                                    border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
                                  focus:border-blue-500 dark:bg-[#1a2c32] dark:border-gray-600
                                  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                 dark:focus:border-blue-500 "
            ></select>
          </div>
        </div>
        <div
          className="rounded-lg shadow  
                        sm:max-w-xl  dark:bg-[#18181B] bg-[#ffffff]  p-5 mt-4"
        >
          <div>
            <label
              htmlFor="small"
              className="block mb-2 text-sm font-medium text-gray-900
                    dark:text-white"
            >
              Participaciones
            </label>
            <div className="flex items-center space-x-4 sm:max-w-full">
              <div className="relative">
                <input type="checkbox" id="toggle" className="sr-only" />
                <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                <div
                  className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full 
                            transition"
                ></div>
              </div>
              <div className="relative mb-6 flex-grow">
                <input
                  id="labels-range-input"
                  type="range"
                  value="50"
                  min="0"
                  max="100"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                  Min (0)
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                  25
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-2/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                  50
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-3/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                  75
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                  Max (100)
                </span>
              </div>
              <input
                type="number"
                min="0"
                max="50"
                step="2"
                value="0"
                name="cantitate"
                className="border border-gray-300 p-2 rounded-lg focus:outline-none 
                        focus:ring-2 focus:ring-blue-500 dark:bg-[#1a2c32]"
              />
            </div>
          </div>

          <div className="mt-2">
            <label
              htmlFor="small"
              className="block mb-2 text-sm font-medium text-gray-900
                    dark:text-white"
            >
              Tareas
            </label>
            <div className="flex items-center space-x-4 sm:max-w-full">
              <div className="relative">
                <input type="checkbox" id="toggle" className="sr-only" />
                <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                <div
                  className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full 
                            transition"
                ></div>
              </div>
              <div className="relative mb-6 flex-grow">
                <input
                  id="labels-range-input"
                  type="range"
                  value="50"
                  min="0"
                  max="100"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                  Min (0)
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                  25
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-2/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                  50
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-3/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                  75
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                  Max (100)
                </span>
              </div>
              <input
                type="number"
                min="0"
                max="50"
                step="2"
                value="0"
                name="cantitate"
                className="border border-gray-300 p-2 rounded-lg focus:outline-none 
                        focus:ring-2 focus:ring-blue-500 dark:bg-[#1a2c32]"
              />
            </div>
          </div>

          <div className="mt-2">
            <label
              htmlFor="small"
              className="block mb-2 text-sm font-medium text-gray-900
                    dark:text-white"
            >
              Examenes
            </label>
            <div className="flex items-center space-x-4 sm:max-w-full">
              <div className="relative">
                <input type="checkbox" id="toggle" className="sr-only" />
                <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                <div
                  className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full 
                            transition"
                ></div>
              </div>
              <div className="relative mb-6 flex-grow">
                <input
                  id="labels-range-input"
                  type="range"
                  value="50"
                  min="0"
                  max="100"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                  Min (0)
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                  25
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-2/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                  50
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-3/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                  75
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                  Max (100)
                </span>
              </div>
              <input
                type="number"
                min="0"
                max="50"
                step="2"
                value="0"
                name="cantitate"
                className="border border-gray-300 p-2 rounded-lg focus:outline-none 
                        focus:ring-2 focus:ring-blue-500 dark:bg-[#1a2c32]"
              />
            </div>
          </div>

          <div className="mt-2">
            <label
              htmlFor="small"
              className="block mb-2 text-sm font-medium text-gray-900
                    dark:text-white"
            >
              Proyectos
            </label>
            <div className="flex items-center space-x-4 sm:max-w-full">
              <div className="relative">
                <input type="checkbox" id="toggle" className="sr-only" />
                <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                <div
                  className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full 
                            transition"
                ></div>
              </div>
              <div className="relative mb-6 flex-grow">
                <input
                  id="labels-range-input"
                  type="range"
                  value="50"
                  min="0"
                  max="100"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                  Min (0)
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                  25
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-2/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                  50
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-3/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                  75
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                  Max (100)
                </span>
              </div>
              <input
                type="number"
                min="0"
                max="50"
                step="2"
                value="0"
                name="cantitate"
                className="border border-gray-300 p-2 rounded-lg focus:outline-none 
                        focus:ring-2 focus:ring-blue-500 dark:bg-[#1a2c32]"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end items-end">
            <div className="mr-4">
              <label
                htmlFor="small"
                className="block text-sm font-medium text-gray-900
                         dark:text-white"
              >
                Total
              </label>
            </div>
            <div>
              <label
                htmlFor="small"
                className="text-3xl font-light text-gray-900 
                        dark:text-white"
              >
                100%
              </label>
            </div>
          </div>

          <div className="mt-2">
            <label
              htmlFor="small"
              className="block mb-2 text-sm font-medium text-gray-900
                    dark:text-white"
            >
              Puntos extras
            </label>
            <div className="flex items-center space-x-3 sm:max-w-full">
              <div className="relative">
                <input type="checkbox" id="toggle" className="sr-only" />
                <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                <div
                  className="dot absolute left-1 top-1 bg-white w-6 h-6
                             rounded-full  transition"
                ></div>
              </div>
              <div className="relative ">
                <input type="checkbox" id="toggle2" className="sr-only" />
                <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                <div
                  key="rounded-a"
                  className="dot absolute left-1 top-1
                             bg-white w-6 h-6 rounded-full transition"
                ></div>
              </div>
              <div className="flex flex-col items-start -ml-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Redondear al entero
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  más próximo
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="w-96  sm:max-w-xl mt-4 text-white bg-[#438e96] hover:bg-[#3b757f] 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 
                        font-medium rounded-lg text-sm px-5 py-2.5  text-center 
                      dark:bg-[#438e96] dark:hover:bg-[#3b757f] 
                    dark:focus:ring-blue-800  "
          >
            Guardar
          </button>
        </div>
      </div>
    </>
  );
}

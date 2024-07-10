import Image from "next/image";
import Link from "next/link";
export default function CardCalificacionFinal() {
  return (
    <div
      className="w-full max-w-sm bg-white border border-gray-200
             dark:bg-[#18181B] rounded-lg shadow dark:border-gray-700"
    >
      <div className="h-24 max-h-24 flex justify-center items-center">
        <Image
          className="dark:opacity-100 opacity-50"
          src="/contenido.svg"
          alt="asistencias"
          width={100}
          height={50}
        />
      </div>

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Calificación final
        </h5>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
        <div className="flex flex-col space-y-4 w-full">
          <Link
            href="/productos_evaluacion/"
            className="w-full text-center px-3 py-2 text-sm font-medium
                        text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-4 
                          focus:outline-none focus:ring-blue-300 dark:bg-blue-600 
                          dark:hover:bg-blue-500 "
          >
            Calificación final
          </Link>
        </div>
      </div>
    </div>
  );
}
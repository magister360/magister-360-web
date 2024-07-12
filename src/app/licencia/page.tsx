import Link from "next/link";

export default function Licencia() {
  return (
    <>
      {" "}
      <div className="container mx-auto mt-10">
        <div className="bg-white items-center justify-center shadow-md rounded-lg p-6 max-w-sm mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Su licencia ha expirado. Por favor, comuníquese con nuestro equipo
            de soporte técnico.
          </h2>

          <Link
            href="/licencia/activacion"
            type="submit"
            className="w-full text-white bg-[#438e96] hover:bg-[#3b757f] 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                          dark:bg-[#438e96] dark:hover:bg-[#3b757f] "
          >
            Activar
          </Link>
        </div>
      </div>
    </>
  );
}

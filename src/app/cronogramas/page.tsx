import Link from "next/link";

export default function Cronogramas() {
  return (
    <div className="mt-16 ml-72 grid grid-cols-4 ">
      <div className="grid grid-cols-subgrid gap-4 col-span-3">
        <Link href="/cronogramas/word">
          <div
            className="bg-white dark:bg-[#18181B] rounded-lg shadow-md  p-4 
                           flex flex-col justify-end space-y-2"
          >
            <p className="text-xl font-bold leading-none ">Cargar</p>
            <p className="text-xl font-bold leading-none opacity-50">cronogramas</p>
            <p className="text-xl font-bold leading-none ">de word</p>
          </div>
        </Link>
        <Link href="/configuration/alumnos/visualizar">
          <div
            className="bg-white dark:bg-[#18181B] rounded-lg shadow-md  p-4 
                       flex flex-col justify-end space-y-2 "
          >
            <p className="text-xl font-bold leading-none ">Visualizar</p>
            <p className="text-xl font-bold leading-none opacity-50">cronogramas</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

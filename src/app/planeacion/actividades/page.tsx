
import Link from "next/link";

export default function Actividades() {

    return (

        <div className="mt-14 ml-72 grid grid-cols-4 ">
            <div className="grid grid-cols-subgrid gap-4 col-span-3">
                <Link href="/planeacion/actividades/asistencia/select_fecha">
                    <div className="bg-white dark:bg-[#18181B] rounded-lg shadow-md  p-4 
                         flex flex-col justify-end space-y-2">

                        <p className="text-xl font-bold leading-none ">Asistencias</p>
                        

                    </div>
                </Link>
                <div className="bg-white dark:bg-[#18181B] rounded-lg shadow-md  p-4 
                     flex flex-col justify-end space-y-2 ">
                    <p className="text-xl font-bold leading-none ">Visualizar</p>
                    <p className="text-xl font-bold leading-none opacity-50">alumnos</p>

                </div>
            </div>


        </div>
    )

}
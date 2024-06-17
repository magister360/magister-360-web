import Image from 'next/image'

type Props = {
    indexRowEncabezado: number[];
    errorEncabezado: string;
}

export const ColumnasDetectadas: React.FC<Props> = ({ indexRowEncabezado, errorEncabezado }) => {

    const OK = '/ok.PNG'
    const ERROR = '/error.PNG'
    const TOTAL_COLUMNAS_ENCABEZADO = 4;
    let selectPathImage: string[] = []

    const comparePathImage = (index: number) => {
        if (indexRowEncabezado[index] !== -1) {
            return OK;
        }
        return ERROR;
    }

    selectPathImage[0] = comparePathImage(0);
    selectPathImage[1] = comparePathImage(1);
    selectPathImage[2] = comparePathImage(2);
    selectPathImage[3] = comparePathImage(3);

    return (
        <div>
            {
                indexRowEncabezado.length === TOTAL_COLUMNAS_ENCABEZADO && (
                    <div className="rounded-lg shadow sm:max-w-md  dark:bg-[#18181B] 
                    bg-[#ffffff]  pl-4 pt-4 pb-4 pr-4 mt-4 space-y-2 ">
                        <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
                            htmlFor="lbl-select-grado-grupo">
                            Columnas detectadas
                        </label>

                        <div className='flex space-x-2'>
                            <Image
                                className=""
                                src={selectPathImage[0]}
                                width={24}
                                height={24}
                                alt=""
                            />
                            <p>
                                No. lista
                            </p>
                        </div>

                        <div className='flex space-x-2'>
                            <Image
                                className=""
                                src={selectPathImage[1]}
                                width={24}
                                height={24}
                                alt=""
                            />
                            <p>
                                Nombre
                            </p>
                        </div>
                        <div className='flex space-x-2'>
                            <Image
                                className=""
                                src={selectPathImage[2]}
                                width={24}
                                height={24}
                                alt=""
                            />
                            <p>
                                Apellido paterno
                            </p>
                        </div>
                        <div className='flex space-x-2'>
                            <Image
                                className=""
                                src={selectPathImage[3]}
                                width={24}
                                height={24}
                                alt=""
                            />
                            <p>
                                Appellido materno
                            </p>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
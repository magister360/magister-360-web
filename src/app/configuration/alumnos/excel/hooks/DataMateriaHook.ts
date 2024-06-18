import { getMaterias } from "@/app/configuration/materia/controller/MateriaController";
import { loadSessionFromLocalStorage } from "@/app/sesions/SesionCookies";
import { TypeStatusMateria } from "@/app/utils/TypeStatusMateria";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



type Props = {

    readColumnsData: (
        file: File,
        startRow: number,
        indexColumn: number,
        indexSheet: number) => Promise<void>;
}

export const useEffectFetchDataMateria = () => {
    const [itemsMaterias, setItemsMaterias] = useState([]);
    const [materiasSinAsignar, setMateriasSinAsignar] = useState([]);
    const [materiasAsignadas, setMateriasAsignadas] = useState([]);
    const router = useRouter()

    useEffect(() => {
        const sesionLocalStorage = loadSessionFromLocalStorage();
        const userId = sesionLocalStorage?.id ?? -1;
        const fetchMaterias = async () => {
            const materias = await getMaterias(
                userId,
                TypeStatusMateria.ALTA
            );

            return materias || [];
        };

        Promise.all([
            fetchMaterias()])
            .then(([materias]) => {
                setItemsMaterias(materias);
                setMateriasSinAsignar(materias)
            })
            .catch((error) => {
                //console.error(error);
            });


    }, []);



    return { materiasSinAsignar, materiasAsignadas };
};


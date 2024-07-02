"use client"

import { loadSessionFromLocalStorage } from "../sesions/SesionCookies";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TypeStatusGrado } from "../utils/TypeStatusGrado";
import { getGrados } from "../configuration/grado/controller/GradoController";
import { getGrupos } from "../configuration/grupo/controller/GrupoController";
import { getMaterias } from "../configuration/materia/controller/MateriaController";
import { TypeStatusMateria } from "../utils/TypeStatusMateria";
import { TypeStatusGrupo } from "../utils/TypeStatusGrupo";
import { ItemGrado, ItemGrupo, ItemMateria } from "../types/types";


export const useEffectFetchGradoGrupoMateria = () => {
    const [itemsGrados, setItemsGrados] = useState<ItemGrado[]>([]);
    const [itemsGrupos, setItemsGrupos] = useState<ItemGrupo[]>([]);
    const [itemsMaterias, setItemsMaterias] = useState<ItemMateria[]>([]);
    const router = useRouter()
    useEffect(() => {
        const sesionLocalStorage = loadSessionFromLocalStorage();
        if (!sesionLocalStorage) {
            router.push('/login');
            return;
        }
        const userId = sesionLocalStorage?.id ?? -1;


        const fetchGrados = async () => {
            const grados = await getGrados(
                userId,
                TypeStatusGrado.ALTA
            );
            return grados || [];
        };

        const fetchGrupos = async () => {
            const grupos = await getGrupos(
                userId,
                TypeStatusGrupo.ALTA
            );
            return grupos || [];
        };

        const fetchMaterias = async () => {
            const materias = await getMaterias(
                userId,
                TypeStatusMateria.ALTA
            );
            return materias || [];
        };

        Promise.all([
            fetchGrados(),
            fetchGrupos(),
            fetchMaterias()])
            .then(([grados, grupos, materias]) => {
                setItemsGrados(grados);
                setItemsGrupos(grupos);
                setItemsMaterias(materias);

            })
            .catch((error) => {
                //console.error(error);
            });

    }, []);
    return {
        itemsGrados,
        itemsGrupos,
        itemsMaterias
    };
}
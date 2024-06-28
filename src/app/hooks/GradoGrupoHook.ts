import { loadSessionFromLocalStorage } from "../sesions/SesionCookies";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TypeStatusGrado } from "../utils/TypeStatusGrado";
import { getGrados } from "../configuration/grado/controller/GradoController";
import { getGrupos } from "../configuration/grupo/controller/GrupoController";
import { TypeStatusGrupo } from "../utils/TypeStatusGrupo";
export const useEffectFetchGradoGrupo = () => {
    const [itemsGrados, setItemsGrados] = useState([]);
    const [itemsGrupos, setItemsGrupos] = useState([]);
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


        Promise.all([
            fetchGrados(),
            fetchGrupos()])
            .then(([grados, grupos]) => {
                setItemsGrados(grados);
                setItemsGrupos(grupos);

            })
            .catch((error) => {
                //console.error(error);
            });

    }, []);
    return {
        itemsGrados,
        itemsGrupos
    };
}
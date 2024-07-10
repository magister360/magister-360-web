import { postInicioSesionApi } from "../services/InicioSesionService"


export const createInicioSesion = async (id:string,idUser: number) => {
     await postInicioSesionApi(id,idUser)
}
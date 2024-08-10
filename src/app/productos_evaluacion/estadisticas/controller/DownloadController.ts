import { downloadExcelApi } from "../services/DownloadService";

export const downloadExcelApiCall = async (
    
  noLista: number[],
  nombres: string[],
  calificaciones: number[]
):Promise<any> => {
  return downloadExcelApi(noLista,nombres, calificaciones);

  
};

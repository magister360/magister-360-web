
import apiSpringBoot from "../../../../../../APISpringBoot";
import { StudentBarcodeType } from "@/app/types/TypesBarcode";



export const createStudentsBarcodeApi = async (
    studentsBarcode: StudentBarcodeType[],
    titulo: string,
    barcodeWidth: number,
    subtitulo1: string,
    subtitulo2: string
  ) => {
    const endpoint = "/generate-barcode";

    const params = new URLSearchParams();
    params.append('titulo', titulo);
    params.append('barcodeWidth', barcodeWidth.toString());
    params.append('subtitulo1', subtitulo1);
    params.append('subtitulo2', subtitulo2);
    console.log('generate barcode...')
    try {
      const response = await apiSpringBoot.post(endpoint, studentsBarcode, {
        params: params,
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('generate barcode.r..')
  
      if (response.status === 200) {
        console.log('Ok 200...')
        return new Blob([response.data], { type: 'application/pdf' });
      } else {
        console.log('Code '+response.status)
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };
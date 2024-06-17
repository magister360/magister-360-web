import { generateBarcodeEAN13 } from "@/app/utils/BarcodeUtils";
import { TypeIndexXlsAlumnos } from "./TypeIndexXlsAlumnos";


export default function convertToBarcode( array: any[]): any[] {
   
    if (array.length === 0 ) {

        return [];
    } else if (array.length !== 0) {
        let arrayBarcodes: any[] = [];
        array.forEach((value, index) => {
            arrayBarcodes[index] = generateBarcodeEAN13(index);
        });
     //   console.log(arrayBarcodes)
        return arrayBarcodes;
    }

    return [];

}
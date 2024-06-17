type Props = {
    indexRowEncabezados: number[];
}

export const validateEncabezado = ({ indexRowEncabezados }: Props): string => {
    const allElementsAreEqual = (arr: number[]): boolean => {
        if (arr.length === 0) return true;
        const firstElement = arr[0];
        return arr.every(element => element === firstElement);
    };
    const isValid = allElementsAreEqual(indexRowEncabezados);
    if(!isValid){
        return 'No es valido el encabezado'
    }
    return '';
};
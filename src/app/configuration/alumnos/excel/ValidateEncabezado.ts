
export function validateEncabezado(arr: number[]): string {
    if (arr.length === 0) {
        return "No es valido el encabezado";
    }

    const firstElement = arr[0];

    if (firstElement === -1) {
        return arr.every(element => element === -1) ? "No es valido el encabezado" : "";
    } else {
        return arr.every(element => element !== -1 && element === firstElement) ? "" : "No es valido el encabezado";
    }
}
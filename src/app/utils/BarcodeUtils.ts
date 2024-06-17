

export function generateBarcodeEAN13(noLista: number): string {
    const now = new Date();

    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear().toString();
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');

    const numberNolistaStr = noLista >= 10 ? noLista.toString() : "0" + noLista;
    const numberYear = year.charAt(year.length - 1);

    let result = day + month + hour + minute + second + numberNolistaStr + numberYear;

    result = result.padEnd(13, '0');

    return result;
}


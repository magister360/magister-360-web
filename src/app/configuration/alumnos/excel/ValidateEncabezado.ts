export function validateEncabezado(arr: number[]): string {
  if (arr.length <= 2) {
    return "No es valido el encabezado";
  }

  const [first, second, third, fourth, ...rest] = arr;

  if (first !== -1 && second !== -1 && third !== -1 && fourth !== -1) {
    return arr.every((element) => element === first)
      ? ""
      : "No es valido el encabezado";
  } else if (first !== -1 && second !== -1&& third === -1 && fourth === -1) {
    return rest.every((element) => element === -1)
      ? ""
      : "No es valido el encabezado";
  } else {
    return "No es valido el encabezado";
  }
}

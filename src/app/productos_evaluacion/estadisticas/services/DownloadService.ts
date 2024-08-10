import apiSpringBoot from "../../../../../APISpringBoot";

export const downloadExcelApi = async (
  noLista: number[],
  nombres: string[],
  calificaciones: number[]
) => {
  const endpoint = "excel_calificaciones";

  const data = {
    noLista:noLista,
    nombres: nombres,
    calificaciones: calificaciones,
  };

  const response = await apiSpringBoot
    .post(endpoint, data, {
      responseType: "blob",
    })
    .then((response) => {
      return response.status === 200 ? response.data : null;
    })
    .catch((error) => {
      return null;
    });
  return response;
};

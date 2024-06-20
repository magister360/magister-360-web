import {
  createGradoApi,
  getGradosApi,
  removeGradoApi,
  updateGradoApi,
} from "../services/GradoService";

export const createGrado = async (
  idUser: number,
  grado: string,
  estatus: number
) => {
  if (idUser <= 0 || !grado || grado.length < 1 || grado.length >= 5) {
    return false;
  }
  return createGradoApi(grado, estatus, idUser);
};

export const removeGrado = async (id: number, estatus: number) => {
  if (id <= 0) {
    return false;
  }
  return removeGradoApi(id, estatus);
};

export const updateGrado = async (id: number, grado: string) => {
  if (id <= 0) {
    return false;
  }
  return updateGradoApi(id, grado);
};

export const getGrados = async (idUser: number, estatus: number) => {
  if (idUser <= 0) {
    return null;
  }
  const response = getGradosApi(idUser, estatus).then((data) => {
    return data;
  });

  return response;
};

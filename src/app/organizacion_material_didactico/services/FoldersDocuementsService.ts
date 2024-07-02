import apiSpringBoot from "../../../../APISpringBoot";

export const fetchCreateFolderApi = async (
  grados: string[],
  grupos: string[],
  materias: string[]
): Promise<boolean> => {
  const endpoint = "create_folders";

  try {
    const response = await apiSpringBoot.post(endpoint, {
      grados,
      grupos,
      materias,
    });

    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

import axios from "axios";
import { getApiUrl } from "../../../../API";
import { decryptString } from "../../security/Security";
import { ResponseCredentials } from "./ResponseCredentials";
import { User } from "@/app/types/types";
import { LastUser, UserLogeado } from "@/app/types/TypesLoginRecords";

export const getUsers = async () => {
  const apiUrl = getApiUrl("/api/users");

  return await axios
    .get(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    })
    .catch((e) => {
      return null;
    });
};

interface CredentialResult {
  approve: boolean;
  id: number;
  userName: string;
  cls: string;
}

export const getCredentials = async (
  userName: string,
  encryptedPassword: string
): Promise<CredentialResult> => {
  if (userName.length === 0 || encryptedPassword.length === 0) {
    return {
      approve: false,
      id: 0,
      userName: "",
      cls: "",
    };
  }
  const apiUrl = getApiUrl("/api/credentials");

  const response = await axios
    .post(
      apiUrl,
      {
        userName,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      return null;
    });
  const decryptStringInput = decryptString(encryptedPassword);

  const responseCredentials = ResponseCredentials.fromStringToJson(response);
  const decryptStringBD = decryptString(responseCredentials.password ?? "");

  const compareAprove: number =
    decryptStringInput.localeCompare(decryptStringBD);

  return {
    approve: compareAprove === 0,
    id: responseCredentials.id,
    userName: responseCredentials.userName,
    cls: responseCredentials.cls,
  };
};

export const getCountUsersApi = async (): Promise<number> => {
  const apiUrl = getApiUrl("/api/count_users");

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return response.data.count as number;
    } else {
      return -1;
    }
  } catch (e) {
    return -1;
  }
};

export const postUserApi = async (userData: User): Promise<void> => {
  const apiUrl = "/api/user";

  try {
    const response = await axios.post(apiUrl, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
  }
};

export const getUltimoUsuarioApi = async (): Promise<LastUser | null> => {
  const apiUrl = getApiUrl("/api/ultimo_user");

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

export const getUserLogeadoApi = async (
  id: number
): Promise<UserLogeado | null> => {
  const apiUrl = getApiUrl("/api/user_logeado");

  try {
    const response = await axios.get(apiUrl, {
      params: {
        id: id,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

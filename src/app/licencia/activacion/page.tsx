"use client";
import { useForm } from "react-hook-form";
import { authProfesor } from "../controller/AuthController";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Datos del formulario:", data);
    authProfesor(data.username,data.password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-[#1a2c32]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 space-y-6 bg-white
        dark:bg-[#1a2c32] rounded-lg shadow-md"
        method="POST"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-white">
          Login
        </h2>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Usuario
          </label>
          <input
            id="username"
            {...register("username", { required: "El usuario es requerido" })}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">
              {errors.username.message as string}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "La contraseña es requerida",
            })}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message as string}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-[#438e96] dark:hover:bg-[#3a7c84]"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}

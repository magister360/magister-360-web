"use client"

import { Users } from "@prisma/client";
import { useEffect, useState } from "react";
import axios from "axios"
import { getUsers } from "../login/services/usersService";


export default function Register() {
    const [users, setUsers] = useState<Users[]>([]);
    const [user, setUser] = useState<Users>({
        id: 0,
        user: '',
        password: '',
        correo: '',
        foto: Buffer.from(new Uint8Array(0)),
        estatus: 0,
        regDate: new Date()

    });



    useEffect(() => {
        Promise.all(
            [getUsers()]
        ).then(() => { })
    }, []);

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    Magister 360
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Nuevo usuario
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="text" name="text" id="text"
                                    className="bg-gray-50 border border-gray-300
                                 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                                  dark:border-gray-600 dark:placeholder-gray-400
                                   dark:text-white dark:focus:ring-blue-500
                                    dark:focus:border-blue-500"
                                    placeholder="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password"
                                    id="password" placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300
                                 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                                  dark:border-gray-600 dark:placeholder-gray-400
                                   dark:text-white dark:focus:ring-blue-500
                                    dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input type="password" name="confirm-password"
                                    id="confirm-password" placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 
                                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                                 focus:border-primary-600 block w-full p-2.5
                                  dark:bg-gray-700 dark:border-gray-600 
                                  dark:placeholder-gray-400 dark:text-white 
                                  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>

                            <button type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 
                                            focus:ring-4 focus:outline-none focus:ring-blue-300 
                                            font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                                          dark:bg-blue-600 dark:hover:bg-blue-700 
                                          dark:focus:ring-blue-800">
                                Crea una cuenta
                            </button>


                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
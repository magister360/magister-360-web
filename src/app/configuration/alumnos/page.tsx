
"use client";

import TableAlumnos from "./components/TableAlumnos";


export default function Alumno() {

    const itempNames = [
        {id:1, noLista: '1', name: 'pedro', apellidoPaterno: 'Martinez', apellidoMaterno: 'Martinez', icon: '/grados.svg', estatus: 0, codigoBarras: '1234567890123' },
        {id:2, noLista: '2', name: 'Maria', apellidoPaterno: 'Perez', apellidoMaterno: 'Martinez', icon: '/grados.svg', estatus: 1, codigoBarras: '1234567890123' },
        {id:3, noLista: '2', name: 'Maria', apellidoPaterno: 'Perez', apellidoMaterno: 'Martinez', icon: '/grados.svg', estatus: 2, codigoBarras: '1234567890123' }

    ];
    const data = [
        { noLista: 1, nombre: "Juan", codigoBarras: "1234567890123" },
        {id:2, noLista: 2, nombre: "María", codigoBarras: "1234567890123" },

    ];

    return (
        <div>
            <TableAlumnos itempNames={itempNames} />
            
        </div>


    );
}
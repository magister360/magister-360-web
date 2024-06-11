
"use client"
import { TypeStatusAlumno } from '@/app/utils/TypeStatusAlumno';
import React from 'react';

interface StatusAlumnoProps {
    value: number;
}
const StatusAlumno: React.FC<StatusAlumnoProps> = ({ value }) => {
    return (
        <div>
            {value === TypeStatusAlumno.ALTA && (
                <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Alta
                </div>
            )}
            {value === TypeStatusAlumno.BAJA && (
                <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> Baja
                </div>
            )}
            {value === TypeStatusAlumno.CAMBIO && (
                <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 me-2"></div> Cambio
                </div>
            )}
        </div>
    );
}

export default StatusAlumno;

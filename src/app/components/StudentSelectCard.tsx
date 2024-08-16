import { Student } from "../types/alumnos/TypeStudents";

interface StudentCardProps {
  student: Student | undefined;
}

const StudentSelectCard: React.FC<StudentCardProps> = ({ student }) => {
  return (
    <>
      {student !== undefined && (
        <div
          className="mt-2 pt-4 pb-4 pl-4 pr-4 rounded-lg shadow sm:max-w-full dark:bg-[#18181B]
         bg-[#ffffff] mr-4 cursor-default"
        >
          <div className="flex flex-col">
            <h3
              className="mt-2 mb-2 block text-gray-700 dark:text-gray-200 
                font-bold text-xl cursor-default"
            >
              Alumno seleccionado:
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 cursor-default">
              Número de lista: {student?.noLista}
            </p>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white cursor-default">
              {student?.nombre} {student?.apellidoPaterno}{" "}
              {student?.apellidoMaterno}
            </h2>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentSelectCard;

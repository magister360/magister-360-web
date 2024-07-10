type Props = {
  readonly data: any[][];
};

export default function TableLoginRecords({ data }: Props) {
  return (
    <>
      {data.length !== 0 && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg  mt-3 mr-3">
          <div
            className="flex items-center justify-between flex-column flex-wrap md:flex-row 
              space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900"
          ></div>
          <table
            className="w-full text-sm text-left rtl:text-right text-gray-500
                          dark:text-gray-400"
          >
            <thead
              className="border-b text-xs  uppercase  
                              dark:bg-[#2d464c] bg-gray-50  dark:text-gray-300 text-black"
            >
              <tr>
                <th scope="col" className="px-6 py-3">
                  Fecha de inicio de sesión
                </th>
                <th scope="col" className="px-6 py-3">
                  Fecha de fin de sesión.
                </th>
                <th scope="col" className="px-6 py-3">
                  Duración
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <></>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

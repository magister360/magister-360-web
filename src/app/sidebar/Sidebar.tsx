import Image from "next/image";
export default function SidebarTop() {
  return (
    <nav
      className="fixed top-0 z-50 w-full h-12 bg-white border-b border-gray-200
      dark:bg-gray-800 dark:border-gray-700 flex justify-center items-center"
    >
      <div className="flex items-center space-x-2">
        <div className="font-normal text-gray-500 text-xl">
          LA NUEVA ESCUELA MEXICANA
        </div>
      </div>
      <div className="absolute right-4 flex items-center">
        <div className="mr-auto">
          <div className="text-base font-semibold">Manuel</div>
          <div className="font-normal text-gray-500">Escalante ramirez</div>
        </div>
        <Image
          className="rounded-full object-cover ml-4"
          src="/notPhoto.png"
          width={24}
          height={24}
          alt=""
        />
      </div>
    </nav>
  );
}

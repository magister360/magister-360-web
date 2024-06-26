import Image from "next/image";
export default function SidebarTop() {
  return (
    <nav
      className="fixed top-0 z-50 w-full h-12 bg-[#356169] 
      dark:bg-[#1a2c32]  flex justify-center items-center "
    >
      <div className="flex items-center space-x-2">
        <div className="font-normal dark:text-gray-500 text-gray-300 text-xl">
          LA NUEVA ESCUELA MEXICANA
        </div>
      </div>
      <div className="absolute right-4 flex items-center">
        <div className="mr-auto">
          <div className="text-base font-semibold  dark:text-gray-300 text-gray-100 ">Manuel</div>
          <div className="font-normal text-gray-300 dark:text-gray-500  ">Escalante ramirez</div>
        </div>
        <div className="w-6 h-6 relative mr-3">
          <Image
            className="rounded-full object-cover ml-4 "
            src="/notPhoto.png"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt=""
          />
        </div>
      </div>
    </nav>
  );
}

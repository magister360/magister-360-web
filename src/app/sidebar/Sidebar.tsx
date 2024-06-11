import Image from 'next/image'
export default function SidebarTop() {
    return (

        <nav className="fixed top-0 z-50 w-full h-12 bg-white border-b border-gray-200
        dark:bg-gray-800 dark:border-gray-700 flex justify-between items-center">
            <div className="p-4 text-2xl font-semibold text-black dark:text-white">
                Magister 360
            </div>
            <Image
                className="rounded-full  object-cover mr-4"
                src="/grupos.svg"
                width={24}
                height={24}
                alt=""
            />
        </nav>
    );
}

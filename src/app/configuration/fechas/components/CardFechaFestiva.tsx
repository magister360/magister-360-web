"use client";
import Card from "@/app/components/Card";
import Link from "next/link";

export default function CardFechaFecha() {
  return (
    <Card
      imageSrc="/contenido.svg"
      imageAlt="fecha festiva"
      title="Registro de fechas festivas"
      description="Ingrese y actualice las fechas festivas en esta sección."
    >
      <Link
        href="/configuration/fechas/fecha_festiva"
        className="w-full text-center px-3 py-2 text-sm font-medium
                text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-4 
                  focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-500 "
      >
        Ir
      </Link>
    </Card>
  );
}

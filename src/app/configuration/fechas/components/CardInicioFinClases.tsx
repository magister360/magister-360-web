"use client";
import Card from "@/app/components/Card";
import Link from "next/link";

export default function CardInicioFinClases() {
  return (
    <Card
      imageSrc="/contenido.svg"
      imageAlt="inicio fin clases"
      title="Registro fechas de inicio y fin de clases"
      description="Ingrese y actualice las fechas inicio fin clases en esta sección."
    >
      <Link
        href="/configuration/fechas/inicio_fin_clases"
        className="w-full text-center px-3 py-2 text-sm font-medium
                text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-4 
                  focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-500 "
      >
        Ir
      </Link>
    </Card>
  );
}

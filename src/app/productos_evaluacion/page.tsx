
import CardCalificacionFinal from "./components/CardCalificacionFinal";
import CardEstadisticas from "./components/CardEstadisticas";
import CardEstadisticasIndividual from "./components/CardEstadisticasIndividual";
import CardGrafica from "./components/CardGrafica";

export default function ProductosEvaluacion() {
  return (
    <div className="mt-14 grid grid-cols-1 gap-4 ml-72 md:grid-cols-4 mb-14">
      <div
        className="grid grid-cols-1 gap-4 col-span-1 md:col-span-3 sm:grid-cols-2 
      lg:grid-cols-3"
      >
        <CardGrafica />
        <CardEstadisticas />
        <CardCalificacionFinal />
        <CardEstadisticasIndividual/>
      </div>
    </div>
  );
}

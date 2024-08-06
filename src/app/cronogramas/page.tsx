
import CardCronograma from "./components/CardCronograma";
import CardCronogramaWord from "./components/CardCronogramaWord";

export default function Cronogramas() {
  return (
    <div className="mt-16 ml-72 grid grid-cols-4 ">
      <div className="grid grid-cols-subgrid gap-4 col-span-3">
        <CardCronogramaWord/>
        <CardCronograma/>
     
      </div>
    </div>
  );
}

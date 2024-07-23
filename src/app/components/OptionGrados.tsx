import { ItemGrado } from "@/app/types/types";
import { v4 as uuidv4 } from "uuid";

type Props = {
  readonly itemsGrados: ItemGrado[];
};

export default function OptionsGrados({ itemsGrados }: Props) {
  return (
    <>
      {itemsGrados.map((item, index) => (
        <option key={uuidv4()} id={index + ""} value={item.grado}>
          {item.grado}
        </option>
      ))}
    </>
  );
}

export const filterIndexGrado = (
  { itemsGrados }: Props,
  index: number
): ItemGrado | undefined => {
  return itemsGrados.find((_, i) => i === index);
};

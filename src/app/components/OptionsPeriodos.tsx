import { v4 as uuidv4 } from "uuid";
import { ItemPeriodo } from "../types/periodos/TypePeriodo";

type Props = {
  readonly itemPeriodos: ItemPeriodo[] | null;
};

export default function OptionsPeriodos({ itemPeriodos }: Props) {
  return (
    <>
      {itemPeriodos?.map((item, index) => (
        <option key={uuidv4()} value={item.noPeriodo}>
          {item.noPeriodo}
        </option>
      ))}
    </>
  );
}

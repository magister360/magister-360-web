import { v4 as uuidv4 } from "uuid";
type Props = {
  readonly items: string[];
};

export default function OptionsActividades({ items }: Props) {
  return (
    <>
      {items.map((item, index) => (
        <option key={uuidv4()} id={uuidv4()} value={item}>
          {item}
        </option>
      ))}
    </>
  );
}

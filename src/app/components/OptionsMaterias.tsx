import { ItemMateria } from "@/app/types/types";

type Props = {
    itemsMaterias: ItemMateria[];
}

export default function OptionsMaterias({ itemsMaterias }: Props) {
    return (
        <>
            {itemsMaterias.map((item, index) => (
                <option key={index} id={index + ''} value={item.materia}>{item.materia}</option>
            ))}
        </>
    );
}

export const filterIndexMaterias = ({ itemsMaterias }: Props, index: number): ItemMateria | undefined => {
    return itemsMaterias.find((_, i) => i === index);
}

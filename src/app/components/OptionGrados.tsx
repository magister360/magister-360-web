import { ItemGrado } from "@/app/types/types";

type Props = {
    itemsGrados: ItemGrado[];
}

export default function OptionsGrados({ itemsGrados }: Props) {
    return (
        <>
            {itemsGrados.map((item, index) => (
                <option key={index} id={index + ''} value={item.grado}>{item.grado}</option>
            ))}
        </>
    );
}

export const filterIndexGrado = ({ itemsGrados }: Props, index: number): ItemGrado | undefined => {
    return itemsGrados.find((_, i) => i === index);
}


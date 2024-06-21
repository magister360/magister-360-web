import { ItemGrupo } from "@/app/types/types";


type Props = {
    itemsGrupos: ItemGrupo[];
}

export default function OptionsGrupos({ itemsGrupos }: Props) {
    return (
        <>
            {itemsGrupos.map((item, index) => (
                <option key={index} value={item.grupo}>{item.grupo}</option>
            ))}
        </>
    );
}

export const filterIndexGrupo = ({ itemsGrupos }: Props, index: number): ItemGrupo | undefined => {
    return itemsGrupos.find((_, i) => i === index);
}
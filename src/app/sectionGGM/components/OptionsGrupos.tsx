type Item = {
    id: number;
    grupo: string;

}

type Props = {
    itemsGrupos: Item[];
}

export default function OptionsGrupos({ itemsGrupos }: Props) {
    return (
        <>
            {itemsGrupos.map((item, index) => (
                <option key={index} id={index + ''} value={item.grupo}>{item.grupo}</option>
            ))}
        </>
    );
}

export const filterIndexGrupo = ({ itemsGrupos }: Props, index: number): Item | undefined => {
    return itemsGrupos.find((_, i) => i === index);
}
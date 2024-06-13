type Item = {
    id: number;
    materia: string;

}

type Props = {
    itemsMaterias: Item[];
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

export const filterIndexMaterias = ({ itemsMaterias }: Props, index: number): Item | undefined => {
    return itemsMaterias.find((_, i) => i === index);
}

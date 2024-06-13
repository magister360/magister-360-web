type Item = {
    id: number;
    grado: string;

}

type Props = {
    itemsGrados: Item[];
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

export const filterIndexGrado = ({ itemsGrados }: Props, index: number): Item | undefined => {
    return itemsGrados.find((_, i) => i === index);
}


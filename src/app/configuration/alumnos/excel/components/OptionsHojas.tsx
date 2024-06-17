

type Props = {
    items: string[];
}

export default function OptionsHojas({ items }: Props) {
    return (
        <>
            {items.map((item, index) => (
                <option key={index} id={index + ''} value={item}>{item}</option>
            ))}
        </>
    );
}
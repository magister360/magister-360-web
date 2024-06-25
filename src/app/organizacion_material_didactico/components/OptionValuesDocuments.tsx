type Props = {
    values: string[];
}

export default function OptionsValuesDocuments({ values }: Props) {
    return (
        <>
            {values.map((value, index) => (
                <option key={index} id={index + ''} value={value}>{value}</option>
            ))}
        </>
    );
}

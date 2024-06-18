import { useEffect } from "react";

type Props = {

    readColumnsData: (
        file: File,
        startRow: number,
        indexColumn: number,
        indexSheet: number) => Promise<void>;
}

export const useEffectFetchDataAlumnos = ({ readColumnsData }: Props) => {


    useEffect(() => {


    }, []);

    return {};
};

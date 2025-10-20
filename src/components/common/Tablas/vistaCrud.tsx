import { TablaCustom } from "./tabla";
interface VistaCRUDProps<T> {
    data: T[];
}

export function VistaCRUD<T extends Record<string, unknown>>({data}: VistaCRUDProps<T>) {
    return (
        <TablaCustom datas={data} />
    );
}

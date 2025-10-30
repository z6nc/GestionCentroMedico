// hooks/useFetch.ts
import useSWR from "swr";

const fetcher = <T>(url: string): Promise<T> =>
    fetch(url).then(res => res.json());

export function useFetch<T>(url: string) {
    const { data, error, mutate } = useSWR<T>(url, fetcher);

    return {
        data,
        error,
        isLoading: !data && !error,
        mutate, // permite actualizar la data o refetchear
    };
}

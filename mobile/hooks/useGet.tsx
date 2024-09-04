import { useQuery } from "@tanstack/react-query";

type FetchFunction<T> = () => Promise<T[]>;

function useFetch<T>(fn: FetchFunction<T>, key: string, options = {}) {
    return useQuery<T[]>({
        queryKey: [key],
        queryFn: fn,
        ...options,
        meta: {
            triggerGlobalLoader: false, // Activar por defecto
            ...options.meta,
        },
    });
}



export default useFetch;
import { useQuery } from "@tanstack/react-query";

type FetchFunction<T> = () => Promise<T[]>;

function useFetch<T>(fn: FetchFunction<T>, key: string, options = {}) {
    return useQuery<T[]>({
        queryKey: [key],
        queryFn: fn,
        initialData: [
            {
                id: 1,
                title: "Initial Item 1",
                completed: false
            },
            {
                id: 2,
                title: "Initial Item 2",
                completed: false
            },
            {
                id: 3,
                title: "Initial Item 3",
                completed: true
            }
        ] as T[],
        ...options,
        meta: {
            triggerGlobalLoader: false, // Activar por defecto
            ...options.meta,
        },
    });
}



export default useFetch;
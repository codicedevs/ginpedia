import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLoading } from "../context/loadingProvider";

type FetchFunction<T> = () => Promise<T[]>;

function useFetch<T>(fn: FetchFunction<T>, key: string, triggerLoader: boolean = false) {
    const { setIsLoading } = useLoading();

    const query = useQuery<T[]>({
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
        ] as T[]
    });

    useEffect(() => {
        if (triggerLoader) {
            setIsLoading(query.isLoading || query.isFetching);
        }
    }, [query.isLoading, query.isFetching]);

    return query;
}

export default useFetch;

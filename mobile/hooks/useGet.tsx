import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLoading } from "../context/loadingProvider";

type FetchFunction<T> = (context: QueryFunctionContext) => Promise<T>;

interface UseFetchProps<T> {
    fn: FetchFunction<T>;
    key: string[];
    triggerLoader?: boolean;
    options?: any;
    initialData?: T | null;
}

function useFetch<T>({
    fn,
    key,
    triggerLoader = false,
    options = {},
    initialData = null,
}: UseFetchProps<T>) {
    const { setIsLoading } = useLoading();

    const query = useQuery<T>({
        queryKey: key,
        queryFn: fn,
        ...options,
        initialData
        // initialData: [ tener q hacer cambios para q funcione esto
        //     {
        //         id: 1,
        //         title: "Initial Item 1",
        //         completed: false
        //     },
        //     {
        //         id: 2,
        //         title: "Initial Item 2",
        //         completed: false
        //     },
        //     {
        //         id: 3,
        //         title: "Initial Item 3",
        //         completed: true
        //     }
        // ] as T[]
    });

    useEffect(() => {
        if (triggerLoader) {
            setIsLoading(query.isLoading || query.isFetching);
        }
    }, [query.isLoading, query.isFetching]);

    return query;
}

export default useFetch;

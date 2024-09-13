import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLoading } from "../context/loadingProvider";

function useOptimistic<T>(key: string, mutationFn: any, onSuccess = () => { }, onError = () => { }, activatesLoader = false) {
    const queryClient = useQueryClient();
    const { setIsLoading } = useLoading();

    return useMutation({
        mutationFn,
        onMutate: async (data: T) => {
            setIsLoading(activatesLoader);

            await queryClient.cancelQueries({ queryKey: [key] });

            const previousData = queryClient.getQueryData([key]);

            queryClient.setQueryData([key], (old: T[]) => {
                console.log(old);
                return ([...old, data]);
            });

            return { previousData };
        },
        onSuccess: () => {
            setIsLoading(false);
            onSuccess();
        },
        onError: (e, data, context) => {
            queryClient.setQueryData([key], context?.previousData);
            setIsLoading(false);
            onError();
        },
        onSettled: () => {
            setIsLoading(false);
            queryClient.invalidateQueries({ queryKey: [key] });
        }
    });
}

export default useOptimistic;

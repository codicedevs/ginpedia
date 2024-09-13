import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLoading } from "../context/loadingProvider";

type MutationFunction<T> = (variables: T) => Promise<any>;
type SuccessHandler = (result?: any) => void;
type ErrorHandler = (error: any) => void;

function useOptimistic<T>(
    key: string,
    mutationFn: MutationFunction<T>,
    onSuccess: SuccessHandler = () => { },
    onError: ErrorHandler = () => { },
    triggerLoader: boolean = false
) {
    const queryClient = useQueryClient();
    const { setIsLoading } = useLoading();

    return useMutation({
        mutationFn,
        onMutate: async (data: T) => {
            if (triggerLoader) {
                setIsLoading(true);
            }

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
            onError(e);
        },
        onSettled: () => {
            setIsLoading(false);
            queryClient.invalidateQueries({ queryKey: [key] });
        }
    });
}

export default useOptimistic;

import { useMutation } from "@tanstack/react-query";
import { useLoading } from "../context/loadingProvider";

type MutationFunction = (variables: any) => Promise<any>;
type SuccessHandler = (result?: any) => void;
type ErrorHandler = (error: any) => void;

export function useMutate(
    mutationFn: MutationFunction,
    onSuccess: SuccessHandler = () => { },
    onError: ErrorHandler = () => { },
    activatesLoader: boolean = false
) {
    const { setIsLoading } = useLoading();

    const { mutateAsync } = useMutation({
        mutationFn,
        onMutate: () => {
            setIsLoading(activatesLoader);
        },
        onSuccess: (data) => {
            setIsLoading(false);
            onSuccess(data);
        },
        onError: (error) => {
            setIsLoading(false);
            onError(error);
        },
        onSettled: () => {
            setIsLoading(false);
        }
    });

    return mutateAsync;
}

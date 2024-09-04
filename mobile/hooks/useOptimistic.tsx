import { useMutation, useQueryClient } from "@tanstack/react-query";

function useOptimistic<T>(key: string, mutationFn: any, onSuccess = () => { }, onError = () => { }) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onMutate: async (data: T) => {
            await queryClient.cancelQueries({ queryKey: [key] })

            const previousData = queryClient.getQueryData([key])

            queryClient.setQueryData([key], (old: T[]) => {
                console.log(old)
                return ([...old, data])
            })

            return { previousData }
        },
        onSuccess,
        onError: (e, data, context) => {
            queryClient.setQueryData([key], context?.previousData)
            onError()
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [key] })
        }
    });
}

export default useOptimistic;
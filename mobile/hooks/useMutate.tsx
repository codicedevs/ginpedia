import { useMutation } from "@tanstack/react-query";

type MutationFunction = (variables: any) => Promise<any>;
type SuccessHandler = (result?: any) => void;
type ErrorHandler = (error: any) => void;

export function useMutate(
  mutationFn: MutationFunction,
  onSuccess: SuccessHandler = () => {},
  onError: ErrorHandler = () => {},
  options: any = {}
) {
  const { mutateAsync } = useMutation({
    mutationFn,
    onSuccess,
    onError,
    options,
  });

  return mutateAsync;
}

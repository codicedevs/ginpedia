import { createContext, useContext, useEffect, useState } from "react";
import Spinner from "../components/spinnerScreen";

type LoadingContextType = {
    isLoadingScreen: boolean;
    setIsLoading: (isLoadingScreen: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType>({
    isLoadingScreen: false,
    setIsLoading: () => { }
});


export function LoadingProvider(props: React.PropsWithChildren) {
    const [isLoadingScreen, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
    }, [isLoadingScreen])
    return (
        <LoadingContext.Provider
            value={{ isLoadingScreen, setIsLoading }}
        >
            <Spinner show={isLoadingScreen} />
            {props.children}
        </LoadingContext.Provider>
    )
}

export const useLoading = () => useContext(LoadingContext);
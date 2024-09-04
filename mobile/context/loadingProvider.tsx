import { createContext, useContext, useEffect, useState } from "react";
import SpinnerScreen from "../components/spinnerScreen";

type LoadingContextType = {
    loadingScreen: boolean;
    setLoadingScreen: (loadingScreen: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType>({
    loadingScreen: false,
    setLoadingScreen: () => { }
});


export function LoadingProvider(props: React.PropsWithChildren) {
    const [loadingScreen, setLoadingScreen] = useState<boolean>(false);

    useEffect(() => {
        console.log('Loading Screen State:', loadingScreen, 'q pasa aca');
    }, [loadingScreen])
    return (
        <LoadingContext.Provider
            value={{ loadingScreen, setLoadingScreen }}
        >
            <SpinnerScreen />
            {props.children}
        </LoadingContext.Provider>
    )
}

export const useLoading = () => useContext(LoadingContext);
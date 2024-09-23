import { createContext, useContext, useEffect, useState } from "react";
import SearchModal from "../components/modal/searchModal";

type SearchContextType = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const SearchContext = createContext<SearchContextType>({
    isOpen: false,
    setIsOpen: () => { }
});


export function SearchProvider(props: React.PropsWithChildren) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
    }, [isOpen])
    return (
        <SearchContext.Provider
            value={{ isOpen, setIsOpen }}
        >
            <SearchModal isVisible={isOpen} setIsVisible={setIsOpen} />
            {props.children}
        </SearchContext.Provider>
    )
}

export const useSearch = () => useContext(SearchContext);
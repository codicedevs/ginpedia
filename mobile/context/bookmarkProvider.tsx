import React, { FC, ReactNode, useContext } from "react";
import useFetch from "../hooks/useGet";
import bookmarkService from "../service/bookmark.service";
import { Bookmark } from "../types/user.type";
import { AuthContext } from "./authProvider";

export const BookmarkContext = React.createContext<{
    bookmarks: Bookmark[];
    getBookmarks: any
}>({
    bookmarks: [],
    getBookmarks: async () => []
});

interface AppProviderProps {
    children: ReactNode;
}

const BookmarkProvider: FC<AppProviderProps> = ({ children }) => {
    const { currentUser } = useContext(AuthContext)

    const getBookmarks = async () => {
        if (!currentUser) return [];
        return (await bookmarkService.bringUserBookmarks(currentUser.id)).data
    }

    const { data: bookmarks, refetch } = useFetch({
        fn: getBookmarks, key: ['bookmarks'], triggerLoader: false, options: {
            enabled: !!currentUser
        }
    })

    return (
        <BookmarkContext.Provider
            value={{
                bookmarks: bookmarks,
                getBookmarks: refetch
            }}
        >
            {children}
        </BookmarkContext.Provider>
    )
}

export default BookmarkProvider;

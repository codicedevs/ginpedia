import React, { FC, ReactNode, useContext, useState } from "react";
import bookmarkService from "../service/bookmark.service";
import { Bookmark } from "../types/user.type";
import { AuthContext } from "./authProvider";

export const BookmarkContext = React.createContext<{
    bookmarks: Bookmark[];
    setBookmarks: (bookmarks: Bookmark[]) => void;
    getBookmarks: (id: number) => Promise<Bookmark[]>;
}>({
    bookmarks: [],
    setBookmarks: () => { },
    getBookmarks: async () => []
});

interface AppProviderProps {
    children: ReactNode;
}

const BookmarkProvider: FC<AppProviderProps> = ({ children }) => {
    const { currentUser } = useContext(AuthContext)
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

    const getBookmarks = async (id: number) => {

        try {
            const res = await bookmarkService.bringUserBookmarks(id);
            setBookmarks(res.data);
            return res.data;
        } catch (error) {
            console.error("Error fetching bookmarks:", error);
            return [];
        }
    };

    return (
        <BookmarkContext.Provider
            value={{
                bookmarks,
                setBookmarks,
                getBookmarks
            }}
        >
            {children}
        </BookmarkContext.Provider>
    )
}

export default BookmarkProvider;

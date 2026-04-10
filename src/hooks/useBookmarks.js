import { useState, useCallback } from "react";

const KEY = "bookmarks";
const getLocalBookmarks = () => JSON.parse(localStorage.getItem(KEY) || "[]");

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(getLocalBookmarks);

  const toggle = useCallback((repo) => {
    setBookmarks((prev) => {
      const exists = prev.some((r) => r.id === repo.id);
      const next = exists
        ? prev.filter((r) => r.id !== repo.id)
        : [...prev, repo];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isBookmarked = useCallback((id) =>{
    return bookmarks.some((r) => r.id === id)
  }, [bookmarks]);

  return { bookmarks, toggle, isBookmarked };
}

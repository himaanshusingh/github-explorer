import { useState, useCallback } from "react";

const KEY = "github-explorer-bookmarks";

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(load);

  const toggle = useCallback((repo) => {
    setBookmarks(prev => {
      const exists = prev.some(r => r.id === repo.id);
      const next = exists ? prev.filter(r => r.id !== repo.id) : [...prev, repo];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isBookmarked = useCallback((id) => bookmarks.some(r => r.id === id), [bookmarks]);

  return { bookmarks, toggle, isBookmarked };
}

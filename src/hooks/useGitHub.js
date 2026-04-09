import { useState, useEffect, useCallback } from "react";

const TOKEN = import.meta.env.VITE_GITHUB_TOKEN || "";

function headers() {
  const h = { Accept: "application/vnd.github.v3+json" };
  if (TOKEN) h.Authorization = `Bearer ${TOKEN}`;
  return h;
}

export function useSearchUsers(query) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) { setUsers([]); return; }
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=12`, { headers: headers() })
      .then(r => { if (!r.ok) throw new Error(`GitHub API error ${r.status}`); return r.json(); })
      .then(data => { if (!cancelled) setUsers(data.items || []); })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [query]);

  return { users, loading, error };
}

export function useUserRepos(username) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setRepos([]);
    setPage(1);
    setHasMore(true);
  }, [username]);

  useEffect(() => {
    if (!username) { setRepos([]); return; }
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`https://api.github.com/users/${username}/repos?per_page=30&page=${page}&sort=updated`, { headers: headers() })
      .then(r => { if (!r.ok) throw new Error(`GitHub API error ${r.status}`); return r.json(); })
      .then((data) => {
        if (!cancelled) {
          setRepos(prev => page === 1 ? data : [...prev, ...data]);
          setHasMore(data.length === 30);
        }
      })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [username, page]);

  const loadMore = useCallback(() => { if (hasMore && !loading) setPage(p => p + 1); }, [hasMore, loading]);

  return { repos, loading, error, hasMore, loadMore };
}

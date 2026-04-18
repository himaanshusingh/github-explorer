import axios from "axios";
import { useState, useEffect, useCallback } from "react";

export function useSearchUsers(query) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return setUsers([]);

    setLoading(true);
    setError(null);

    (async function () {
      try {
        const res = await axios.get(`https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=12`); // prettier-ignore
        setUsers(res.data.items || []);
      } catch (err) {
        console.log(err);
        setError(err.message);
        throw new Error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    })();
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
    setPage(1); // Reset back to page 1 for the new user
    setHasMore(true);
  }, [username]);

  useEffect(() => {
    if (!username) return setRepos([]);
    setLoading(true);
    setError(null);

    (async function () {
      try {
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=30&page=${page}&sort=updated`);
        // If it's page 2+, append the new data to the existing repos.
        setRepos((prevRepos) => page === 1 ? res.data : [...prevRepos, ...res.data]);
        // If we got exactly 30 repos, there MIGHT be more on the next page.
        setHasMore(res.data.length === 30);
      } catch (err) {
        console.log(err);
        setError(err.message);
        throw new Error("Failed to fetch repositories");
      } finally {
        setLoading(false);
      }
    })(); // prettier-ignore
  }, [username, page]);

  const loadMore = useCallback(() => {
    if (hasMore && !loading) setPage((prevPage) => prevPage + 1);
  }, [hasMore, loading]);

  return { repos, loading, error, hasMore, loadMore };
}

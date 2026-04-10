// External Modules :-
import { useState, useMemo, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";

// Local Modules :-
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import RepoCard from "../components/RepoCard";
import RepoFilters from "../components/RepoFilters";
import StateMessage from "../components/StateMessage";

// Custom Hooks :-
import { useDebounce } from "../hooks/useDebounce";
import { useSearchUsers, useUserRepos } from "../hooks/useGitHub";
import { useBookmarks } from "../hooks/useBookmarks";
import { useTheme } from "../hooks/useTheme";

/**
 * Index Page Component
 *
 * This is the main orchestrator component of the application. It acts as the
 * "smart" container, maintaining the application's core state and business logic.
 *
 * Key Responsibilities:
 * - Manages the master search state and debounces user inputs via `useDebounce`.
 * - Interacts with custom hooks (`useSearchUsers`, `useUserRepos`, `useBookmarks`, `useTheme`)
 *   to fetch data and manage side-effects.
 * - Handles the display logic toggling between the User Search View,
 *   the User Repositories View, and the Bookmarks View.
 * - Manages pagination (infinite scrolling) for repositories using the Intersection Observer API.
 * - Manages client-side sorting and filtering for the displayed repositories list.
 */

const Index = () => {
  const { dark, toggle: toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const loadMoreRef = useRef(null);
  const debouncedQuery = useDebounce(query, 400);
  const {
    users,
    loading: usersLoading,
    error: usersError,
  } = useSearchUsers(debouncedQuery);
  const [selectedUser, setSelectedUser] = useState(null);
  const {
    repos,
    loading: reposLoading,
    error: reposError,
    hasMore,
    loadMore,
  } = useUserRepos(selectedUser?.login ?? null);
  const { bookmarks, toggle: toggleBookmark, isBookmarked } = useBookmarks();
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [sortBy, setSortBy] = useState("updated");
  const [filterLang, setFilterLang] = useState("");

  const languages = useMemo(() => {
    const source = showBookmarks ? bookmarks : repos;
    return [...new Set(source.map((r) => r.language).filter(Boolean))].sort();
  }, [repos, bookmarks, showBookmarks]);

  const displayRepos = useMemo(() => {
    let list = showBookmarks ? [...bookmarks] : [...repos];
    if (filterLang) list = list.filter((r) => r.language === filterLang);
    switch (sortBy) {
      case "stars":
        list.sort((a, b) => b.stargazers_count - a.stargazers_count);
        break;
      case "forks":
        list.sort((a, b) => b.forks_count - a.forks_count);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return list;
  }, [repos, bookmarks, showBookmarks, sortBy, filterLang]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setShowBookmarks(false);
    setSortBy("updated");
    setFilterLang("");
  };

  const showRepoSection = showBookmarks || selectedUser;

  useEffect(() => {
    if (!hasMore || reposLoading || showBookmarks) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "100px" },
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore, reposLoading, showBookmarks, loadMore]);

  return (
    <div className="flex flex-col overflow-hidden">
      <Header
        dark={dark}
        onToggleTheme={toggleTheme}
        showBookmarks={showBookmarks}
        onToggleBookmarks={() => {
          setShowBookmarks((s) => !s);
          setFilterLang("");
          setSortBy("updated");
        }}
        bookmarkCount={bookmarks.length}
      />

      <main className="flex-1 container max-w-6xl mx-auto px-4 py-6 flex flex-col min-h-0">
        {/* Search */}
        <div className="mb-6 shrink-0">
          <SearchBar
            value={query}
            onChange={(v) => {
              setQuery(v);
              setSelectedUser(null);
              setShowBookmarks(false);
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-h-0 pr-2 pb-6">
          {showRepoSection ? (
            <div>
              {/* Back + Title */}
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => {
                    setSelectedUser(null);
                    setShowBookmarks(false);
                  }}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                </button>
                <div className="flex items-center gap-3">
                  {selectedUser && !showBookmarks && (
                    <img
                      src={selectedUser.avatar_url}
                      alt={selectedUser.login}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <h2 className="text-lg font-semibold text-card-foreground">
                    {showBookmarks
                      ? "Bookmarked Repositories"
                      : `${selectedUser?.login}'s Repositories`}
                  </h2>
                </div>
              </div>

              {/* Filters */}
              <div className="mb-4">
                <RepoFilters
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  filterLang={filterLang}
                  setFilterLang={setFilterLang}
                  languages={languages}
                />
              </div>

              {/* Repos */}
              {reposLoading && !showBookmarks && displayRepos.length === 0 ? (
                <StateMessage type="loading" />
              ) : reposError && !showBookmarks ? (
                <StateMessage type="error" message={reposError} />
              ) : displayRepos.length === 0 ? (
                <StateMessage
                  type={showBookmarks ? "no-bookmarks" : "empty"}
                  message={
                    showBookmarks
                      ? "Bookmark repos to save them here"
                      : "No repos match your filters"
                  }
                />
              ) : (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {displayRepos.map((repo) => (
                      <RepoCard
                        key={repo.id}
                        repo={repo}
                        bookmarked={isBookmarked(repo.id)}
                        onToggleBookmark={toggleBookmark}
                      />
                    ))}
                  </div>
                  {hasMore && !showBookmarks && (
                    <div
                      ref={loadMoreRef}
                      className="flex justify-center mt-6 h-10 items-center"
                    >
                      {reposLoading && (
                        <span className="text-muted-foreground text-sm">
                          Loading more...
                        </span>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <>
              {usersLoading ? (
                <StateMessage type="loading" message="Searching users..." />
              ) : usersError ? (
                <StateMessage type="error" message={usersError} />
              ) : debouncedQuery && users.length === 0 ? (
                <StateMessage
                  type="empty"
                  message={`No users found for "${debouncedQuery}"`}
                />
              ) : users.length > 0 ? (
                <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                  {users.map((u) => (
                    <UserCard
                      key={u.id}
                      user={u}
                      selected={selectedUser?.id === u.id}
                      onSelect={handleSelectUser}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-3xl">🔍</span>
                  </div>
                  <h2 className="text-xl font-semibold text-card-foreground mb-2">
                    Explore GitHub
                  </h2>
                  <p className="text-muted-foreground text-sm max-w-sm">
                    Search for any GitHub user to explore their repositories,
                    star counts, and more.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;

const RepoFilters = ({ sortBy, setSortBy, filterLang, setFilterLang, languages }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="mx-2 px-3 py-1.5 rounded-lg border border-input bg-card text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
      >
        <option value="updated">Recently Updated</option>
        <option value="stars">Most Stars</option>
        <option value="forks">Most Forks</option>
        <option value="name">Name A-Z</option>
      </select>

      <select
        value={filterLang}
        onChange={(e) => setFilterLang(e.target.value)}
        className="mx-2 px-3 py-1.5 rounded-lg border border-input bg-card text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
      >
        <option value="">All Languages</option>
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
}; // prettier-ignore

export default RepoFilters;

const RepoFilters = ({ sortBy, setSortBy, filterLang, setFilterLang, languages }) => (
  <div className="flex flex-wrap gap-2">
    <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="mx-2 px-3 py-1.5 rounded-lg border border-input bg-card text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring">
      <option value="updated">Recently Updated</option>
      <option value="stars">Most Stars</option>
      <option value="forks">Most Forks</option>
      <option value="name">Name A-Z</option>
    </select>
    <select value={filterLang} onChange={e => setFilterLang(e.target.value)} className="px-3 py-1.5 rounded-lg border border-input bg-card text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring">
      <option value="">All Languages</option>
      {languages.map(l => <option key={l} value={l}>{l}</option>)}
    </select>
  </div>
);

export default RepoFilters;

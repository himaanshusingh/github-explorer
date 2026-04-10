import { Search, X } from "lucide-react";

const SearchBar = ({ value, onChange }) => (
  <div className="relative w-full max-w-xl mx-auto">
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

    <input
      type="text"
      value={value}
      placeholder="Search GitHub users..."
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-12 pr-10 py-3 rounded-xl border border-input bg-card text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
    />

    {value && (
      <button
        onClick={() => onChange("")}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
      >
        <X className="h-4 w-4 text-muted-foreground" />
      </button>
    )}
  </div>
);

export default SearchBar;

import { Loader2, AlertCircle, Search, BookmarkX } from "lucide-react";

const icons = {
  loading: <Loader2 className="h-8 w-8 animate-spin text-primary" />,
  error: <AlertCircle className="h-8 w-8 text-destructive" />,
  empty: <Search className="h-8 w-8 text-muted-foreground" />,
  "no-bookmarks": <BookmarkX className="h-8 w-8 text-muted-foreground" />,
};

const defaults = {
  loading: "Loading...",
  error: "Something went wrong",
  empty: "No results found",
  "no-bookmarks": "No bookmarks yet",
};

const StateMessage = ({ type, message }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
    {icons[type]}
    <p className={`text-sm ${type === "error" ? "text-destructive" : "text-muted-foreground"}`}>{message || defaults[type]}</p>
  </div>
);

export default StateMessage;
